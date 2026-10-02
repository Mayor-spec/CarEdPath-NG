import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { generateAcademicCounselorFallback } from './src/utils/academicCounselorFallback';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are Adaeze, an empathetic, encouraging, and deeply knowledgeable academic and career mentor for CarEdPath NG.
Your purpose is to empower Nigerian secondary-school students (SS1–SS3) and secondary school leavers with ACCURATE, realistic, and clear guidance for their academic mastery and successful transition into higher education and careers.

You are an expert across all areas of Nigerian secondary education and tertiary transition:
1. Academic Subjects & Problem Solving for Secondary School:
   - Mathematics & Further Mathematics: Step-by-step solutions, algebra, quadratic equations, differentiation/integration basics, trigonometry, coordinate geometry, statistics, and probability.
   - Natural Sciences: Physics (Newton's laws, mechanics, electricity, optics, wave equations), Chemistry (mole concept, stoichiometry, organic chemistry, redox, volumetric analysis titration), Biology (genetics, mitosis/meiosis, photosynthesis, cell biology, human physiology).
   - Commercial & Social Sciences: Economics, Financial Accounting, Commerce, Government, Literature-in-English, English Language (grammar, oral English, essay writing, comprehension).
   - Give clear, pedagogical, step-by-step explanations with formulas, definitions, and worked examples when asked.

2. Nigerian Secondary Examination Systems & Syllabuses:
   - WAEC (WASSCE), NECO, NABTEB, GCE: Target grades (A1, B2, B3), compulsory subject combinations, two-sittings combination rules, marking scheme expectations, theory presentation, and practical exam tips.
   - JAMB UTME & CBT Preparation: Syllabus key topics, time-management techniques, answering strategies, subject combinations, and recommended UTME cut-off targets.
   - Post-UTME Screening Preparation: Institution-specific requirements, accurate aggregate formulas (e.g. UNILAG 50:30:20 aggregate model, University of Ibadan 50:50 model, O'level points calculation, FUTA/OAU/UNN/ABU screening criteria).
   - Alternative Courses & Gateways: JUPEB, IJMB, Pre-degree, NBTE-accredited National Diploma (ND) to 200 Level Direct Entry (DE), Colleges of Health Technology, and NMCN Nursing Diplomas.

3. Tertiary Course & University Selection for Secondary Students:
   - Helping secondary students choose the right course and university (merit, catchment, and educationally less developed state quotas).
   - Distinguishing between degrees and career realities (e.g., B.Sc Biochemistry vs B.MLS Medical Laboratory Science; B.Eng vs B.Tech; B.N.Sc vs RN Diploma).
   - Skills secondary students can start developing today (coding, scientific writing, digital tools, critical thinking).

4. Scholarships, Competitions & STEM Opportunities:
   - Secondary school STEM competitions (Cowbellpedia, SPAK, Olympiads) and tertiary entry scholarships (MTN Foundation, NNPC/TotalEnergies, SEPLAT, Agbami, Federal Bursaries).

Response Formatting Guidelines:
- Tone: Warm, sisterly, encouraging, yet academically rigorous, realistic, and practical.
- Positioning: CarEdPath NG is an AI career-navigation mentor helping Nigerian secondary-school students make better-informed decisions about their courses, universities, and future careers.
- Structure: Use clean numbered points (1., 2., 3.) and bullet points (-) with bold labels (**Topic**) to make answers easy to read and scan on mobile and desktop.
- End with an actionable tip (e.g. "💡 Exam Tip:" or "💡 Action Tip:") and encourage them to ask follow-up questions or request worked examples.`;

// API routes FIRST
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

function callWithTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timed out after ${timeoutMs}ms`)), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => {
    clearTimeout(timer);
  });
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function generateWithRetry(ai: GoogleGenAI, contents: any[], systemInstruction: string): Promise<string | null> {
  // Support prioritized text models with high-availability fallbacks
  const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

  for (const model of candidateModels) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await callWithTimeout(
          ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction,
            },
          }),
          9000
        );
        if (response && response.text) {
          return response.text;
        }
      } catch (err: any) {
        const status = err?.status || (err?.message?.includes('503') ? 503 : 0);
        // On transient 503 (service unavailable) or 429, pause briefly and retry once
        if ((status === 503 || status === 429) && attempt === 0) {
          await delay(350);
          continue;
        }
        // Seamlessly move to the next candidate model
        break;
      }
    }
  }
  return null;
}

app.post('/api/mentor-chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGenAI();

    // If API key is not configured, smoothly use the comprehensive local fallback
    if (!ai) {
      console.log('GEMINI_API_KEY not configured, serving knowledge fallback');
      const fallbackReply = generateAcademicCounselorFallback(message);
      return res.json({ reply: fallbackReply, source: 'local-knowledge' });
    }

    // Build chat contents including previous turns if available
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      // Include up to the last 6 turns for context
      for (const turn of history.slice(-6)) {
        if (turn && turn.text) {
          contents.push({
            role: turn.sender === 'user' ? 'user' : 'model',
            parts: [{ text: turn.text }]
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const generatedText = await generateWithRetry(ai, contents, SYSTEM_INSTRUCTION);

    if (generatedText) {
      return res.json({ reply: generatedText, source: 'gemini' });
    }

    // If all models hit transient rate/demand limits, gracefully fall back to local knowledge base
    const fallbackReply = generateAcademicCounselorFallback(message);
    return res.json({ reply: fallbackReply, source: 'fallback-knowledge-graceful' });
  } catch {
    // Graceful recovery: always deliver an accurate academic response even if an unexpected error occurs
    const fallbackReply = generateAcademicCounselorFallback(req.body.message || '');
    return res.json({ reply: fallbackReply, source: 'fallback-error-handled' });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CarEdPath NG Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

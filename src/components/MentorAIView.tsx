import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { MentorMessageRenderer } from './MentorMessageRenderer';
import { generateAcademicCounselorFallback } from '../utils/academicCounselorFallback';

interface MentorAIViewProps {
  initialQuery?: string;
  onOpenPivotModal: () => void;
  onOpenSampleRoadmap: () => void;
}

const ACADEMIC_TOPIC_PILLS = [
  { label: '📐 Quadratic & Calculus Help', query: 'Can you explain the quadratic formula and differentiation rules for WAEC and JAMB?' },
  { label: '⚡ Newton\'s Laws & Physics Motion', query: 'Explain Newton\'s laws of motion and the 4 equations of linear motion for physics exam' },
  { label: '🧪 Mole Concept & Titration', query: 'How does the mole concept and acid-base titration calculation work in Chemistry?' },
  { label: '🧬 Mitosis vs Meiosis', query: 'What is the exact difference between mitosis and meiosis in biology?' },
  { label: '📊 Calculate UNILAG / UI Aggregate', query: 'How do I calculate aggregate score for UNILAG 50:30:20 and UI Post-UTME?' },
  { label: '🎓 5.0 CGPA & First Class Guide', query: 'How is CGPA calculated on the 5.0 scale in Nigerian universities and how to get First Class?' },
  { label: '📝 Combining WAEC & NECO', query: 'Can I combine two sittings of WAEC and NECO for university admission in Nigeria?' },
  { label: '📚 Study & Memorization Tips', query: 'What are the best study techniques and active recall tips to pass WAEC with distinctions?' }
];

export const MentorAIView: React.FC<MentorAIViewProps> = ({
  initialQuery,
  onOpenPivotModal,
  onOpenSampleRoadmap
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello, sister! I'm Adaeze, your CarEdPath NG Academic & Career Mentor. Whether you need help solving a Mathematics equation, understanding Physics laws, mastering Chemistry stoichiometry, calculating your Post-UTME aggregate, combining WAEC/NECO results, or planning a Direct Entry pivot, I'm here to give you accurate, step-by-step academic explanations made for Nigerian students. What academic question is on your mind today?",
      timestamp: 'Just now',
      suggestedPrompts: [
        'How do I calculate UNILAG aggregate score?',
        'Explain Newton\'s 3 laws of motion',
        'Can I combine WAEC and NECO for admission?',
        'How is 5.0 CGPA calculated in universities?'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const generateContextualPrompts = (query: string): string[] => {
    const q = query.toLowerCase();
    if (q.includes('math') || q.includes('calculus') || q.includes('quadratic')) {
      return [
        'Give me a worked example of differentiation',
        'How to solve quadratic equations by completing square',
        'What are the key circle theorems for WAEC?'
      ];
    }
    if (q.includes('physics') || q.includes('motion') || q.includes('newton')) {
      return [
        'Show me a calculation using v² = u² + 2as',
        'How to write physics practical reports in WAEC',
        'Explain Ohm\'s law and electrical power formulas'
      ];
    }
    if (q.includes('chemistry') || q.includes('mole') || q.includes('titration')) {
      return [
        'Calculate molarity from titration readings',
        'What are the tests for Fe2+ and Fe3+ ions?',
        'Explain balancing redox equations in acid'
      ];
    }
    if (q.includes('biology') || q.includes('mitosis') || q.includes('genetics')) {
      return [
        'Explain sickle cell inheritance (AS x AS cross)',
        'What are the rules for drawing WAEC biology diagrams?',
        'What is the difference between DNA and RNA?'
      ];
    }
    if (q.includes('aggregate') || q.includes('score') || q.includes('cut-off')) {
      return [
        'Simulate a cut-off pivot for me',
        'What if I scored 198 in JAMB?',
        'How does catchment area affect admission?'
      ];
    }
    if (q.includes('cgpa') || q.includes('grade') || q.includes('first class')) {
      return [
        'What is a Carry-Over and how does it affect CGPA?',
        'How to apply for intra-university course transfer',
        'What scholarships can I apply for in 100L with 3.5+ CGPA?'
      ];
    }
    return [
      'How to calculate UNILAG aggregate score?',
      'Show me Amina\'s Direct Entry blueprint',
      'What scholarships can I apply for in 100L?'
    ];
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Call server Gemini AI API with fallback to comprehensive academic counselor knowledge
    try {
      // Pass previous turns for conversational continuity
      const historyPayload = messages.slice(-6).map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || generateAcademicCounselorFallback(query);

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: generateContextualPrompts(query)
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch {
      // Graceful offline/fallback instant academic answer
      const localReply = generateAcademicCounselorFallback(query);
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: localReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: generateContextualPrompts(query)
      };

      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto w-full px-3 sm:px-4 py-3">
      {/* Header Profile Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0a192f] text-white flex items-center justify-center font-bold text-[15px] shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">psychology</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif-headline text-[16px] font-bold text-[#0a192f]">
                Adaeze — CarEdPath NG Academic &amp; Career Mentor
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Online & Ready"></span>
            </div>
            <span className="text-[11px] text-slate-500">
              Expert in Nigerian WAEC, JAMB, Subject Formulas, University Admissions &amp; CGPA
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onOpenPivotModal}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-[#b91c1c] text-[11px] font-bold border border-red-200 hover:bg-red-100 cursor-pointer transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">alt_route</span>
            <span>Pivot Tool</span>
          </button>
        </div>
      </div>

      {/* Quick Academic Topics Scroller */}
      <div className="mb-2.5 overflow-x-auto pb-1 flex items-center gap-1.5 no-scrollbar">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pl-1 flex-shrink-0">
          Topics:
        </span>
        {ACADEMIC_TOPIC_PILLS.map((pill, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(pill.query)}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-[#0a192f] hover:bg-slate-50 text-slate-700 text-[11px] font-medium whitespace-nowrap cursor-pointer transition-all shadow-2xs flex-shrink-0"
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3.5 pb-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {/* Chat Bubble: Deep Blue / Crimson Accents */}
            <div
              className={`max-w-[92%] sm:max-w-[85%] p-3.5 sm:p-4 text-[13px] sm:text-[14px] leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-white text-slate-900 rounded-2xl rounded-tr-none border border-slate-200'
                  : 'bg-white border-l-4 border-l-[#dc2626] text-slate-900 rounded-2xl rounded-tl-none border border-slate-200/90'
              }`}
            >
              <MentorMessageRenderer rawText={msg.text} sender={msg.sender} />
              <span className="text-[10px] text-slate-400 block mt-2 text-right">
                {msg.timestamp}
              </span>
            </div>

            {/* Suggested Chips if available on latest AI message */}
            {msg.sender === 'ai' && msg.suggestedPrompts && (
              <div className="flex flex-wrap gap-1.5 mt-2 max-w-[92%]">
                {msg.suggestedPrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => {
                      if (prompt.includes('pivot')) {
                        onOpenPivotModal();
                      } else if (prompt.includes('Amina')) {
                        onOpenSampleRoadmap();
                      } else {
                        handleSendMessage(prompt);
                      }
                    }}
                    className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] text-[#0a192f] font-medium hover:bg-slate-50 hover:border-[#dc2626] transition-all cursor-pointer shadow-2xs"
                    type="button"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2.5 self-start p-3 rounded-2xl rounded-tl-none bg-blue-950/5 border-l-4 border-l-[#dc2626] text-[12px] text-slate-700">
            <span className="animate-spin material-symbols-outlined text-[16px] text-[#dc2626]">
              sync
            </span>
            <span>Adaeze is consulting academic syllabuses &amp; formulating explanation...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="mt-2 flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm"
      >
        <input
          type="text"
          id="mentor-chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask any academic question (e.g. quadratic formula, Newton's laws, UNILAG aggregate, WAEC tips)..."
          className="flex-1 px-3 py-2 text-[13px] text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
        />
        <button
          id="mentor-chat-submit-btn"
          type="submit"
          disabled={!input.trim() || isTyping}
          className="w-10 h-10 rounded-xl bg-[#0a192f] text-white flex items-center justify-center hover:bg-[#152a4d] disabled:opacity-50 transition-colors cursor-pointer flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
        </button>
      </form>
    </div>
  );
};

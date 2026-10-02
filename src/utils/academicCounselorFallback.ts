/**
 * Comprehensive fallback knowledge base for CarEdPath NG's Adaeze Mentor
 * Accurately answers academic questions across Mathematics, Sciences, WAEC/NECO,
 * JAMB aggregates, CGPA calculations, university courses, and study strategies.
 */

export function generateAcademicCounselorFallback(userQuery: string): string {
  const q = userQuery.toLowerCase().trim();

  // 1. Mathematics & Calculations
  if (
    q.includes('quadratic') ||
    q.includes('calculus') ||
    q.includes('differentiation') ||
    q.includes('integration') ||
    q.includes('math') ||
    q.includes('further math') ||
    q.includes('trigonometry') ||
    q.includes('simultaneous')
  ) {
    if (q.includes('quadratic')) {
      return `Solving Quadratic Equations (General Form: ax² + bx + c = 0):

1. The Quadratic Formula:
- x = (-b ± √(b² - 4ac)) / (2a)
- The Discriminant (Δ = b² - 4ac):
  • If Δ > 0: Two distinct real roots.
  • If Δ = 0: One real repeated root (perfect square).
  • If Δ < 0: Complex / imaginary roots (no real solutions).

2. Factorization Method:
- Find two factors of (a × c) that sum up to b.
- Example: x² - 5x + 6 = 0 → (x - 2)(x - 3) = 0, so x = 2 or x = 3.

3. Completing the Square:
- Divide through by a, move c/a to the right, and add (b/2a)² to both sides.

💡 WAEC Exam Tip: Always show your complete step-by-step substitution into the formula. In WASSCE Theory questions, 70% of marks are awarded for method (M1, A1) rather than the final answer alone!`;
    }

    if (q.includes('calculus') || q.includes('differentiat') || q.includes('integrat')) {
      return `Core Calculus Essentials for WAEC / JAMB / 100 Level:

1. Basic Differentiation (Power Rule):
- If y = axⁿ, then dy/dx = n · axⁿ⁻¹
- Example: If y = 4x³ - 5x² + 7x - 9, then dy/dx = 12x² - 10x + 7.
- Product Rule: d/dx[u·v] = u(dv/dx) + v(du/dx).
- Quotient Rule: d/dx[u/v] = [v(du/dx) - u(dv/dx)] / v².
- Chain Rule: dy/dx = (dy/du) · (du/dx).

2. Basic Integration (Anti-derivative):
- ∫ xⁿ dx = (xⁿ⁺¹ / (n + 1)) + C (where n ≠ -1).
- Example: ∫ (3x² + 4x - 5) dx = x³ + 2x² - 5x + C.
- Definite Integrals: Evaluate between limits [a, b] without the constant C.

💡 Action Tip: In JAMB CBT, calculus questions usually test turning points (stationary points where dy/dx = 0) and maximum/minimum values. Differentiate once, set to 0, and solve for x!`;
    }

    return `Essential Mathematics & Further Maths Preparation Tips:

1. High-Yield Topics for WAEC & JAMB:
- General Maths: Quadratic equations, Logarithms & Indices, Coordinate Geometry, Trigonometry (SOHCAHTOA and Sine/Cosine rules), Statistics & Probability, Sets, and Circle Theorems.
- Further Maths: Matrices & Determinants, Vectors & Mechanics, Calculus, Polynomials, and Permutation & Combination.

2. Problem-Solving Strategy:
- Step 1: Write down all known parameters and what you are asked to find.
- Step 2: State the appropriate mathematical theorem or formula.
- Step 3: Show legible, neat algebraic substitutions.

💡 Exam Tip: Practice with past questions under timed conditions (40 questions in 40 minutes) to build speed for JAMB CBT!`;
  }

  // 2. Physics Concepts
  if (
    q.includes('physics') ||
    q.includes('newton') ||
    q.includes('ohm') ||
    q.includes('motion') ||
    q.includes('wave') ||
    q.includes('electricity') ||
    q.includes('velocity')
  ) {
    if (q.includes('newton') || q.includes('motion')) {
      return `Newton's Three Laws of Motion & Equations of Linear Motion:

1. The Laws Explained:
- First Law (Inertia): A body continues in its state of rest or uniform motion in a straight line unless acted upon by an external net force.
- Second Law (Momentum & Force): The rate of change of momentum is directly proportional to the applied force and takes place in the direction of the force (F = ma).
- Third Law (Action & Reaction): To every action, there is an equal and opposite reaction.

2. The 4 Equations of Uniformly Accelerated Motion:
- 1. v = u + at
- 2. s = ut + ½at²
- 3. v² = u² + 2as
- 4. s = ½(u + v)t
(where u = initial velocity, v = final velocity, a = acceleration, t = time, s = distance/displacement).

3. Motion Under Gravity:
- Replace acceleration 'a' with 'g' (take g = 9.8 m/s² or 10 m/s² as specified in the exam paper). If projected vertically upward, a = -g.

💡 WAEC Tip: In Physics practical exams (Mechanics, Optics, Electricity), always draw lines of best fit, tabulate your readings with correct units, and record values to at least 2 decimal places!`;
    }

    return `Key Physics Principles for Nigerian Exams:

1. Essential Formulas:
- Ohm's Law: V = I × R (Voltage = Current × Resistance).
- Electrical Power: P = IV = I²R = V²/R; Electrical Energy = P × t.
- Wave Equation: v = f × λ (Velocity = frequency × wavelength).
- Work, Energy & Power: Work = Force × distance; Kinetic Energy = ½mv²; Potential Energy = mgh.

2. WAEC Physics Structure:
- Paper 1: 50 Objective questions (1 hour 15 mins).
- Paper 2: Theory consisting of Part I (short conceptual questions) and Part II (comprehensive multi-part problems).
- Paper 3: Practical exam (Mechanics, Optics/Lenses, or Electricity).

💡 Study Strategy: Focus on dimensional analysis, SI units conversions, and understanding definitions by heart!`;
  }

  // 3. Chemistry Concepts
  if (
    q.includes('chemistry') ||
    q.includes('mole') ||
    q.includes('titration') ||
    q.includes('organic') ||
    q.includes('redox') ||
    q.includes('periodic') ||
    q.includes('acid')
  ) {
    return `Mastering Chemistry for WAEC, NECO & JAMB:

1. The Mole Concept & Stoichiometry:
- Number of Moles (n) = Mass (g) / Molar Mass (g/mol)
- For gases at standard temperature and pressure (s.t.p.): Moles = Volume (dm³) / 22.4 dm³
- For solutions: Concentration (mol/dm³) = Moles / Volume (dm³) → C = n / V

2. Titration Formula (Volumetric Analysis):
- (Cₐ × Vₐ) / (Cᵦ × Vᵦ) = nₐ / nᵦ
- Where Cₐ, Cᵦ = concentration of acid and base; Vₐ, Vᵦ = average volume used; nₐ, nᵦ = mole ratio from the balanced chemical equation.

3. Organic Chemistry Essentials:
- Hydrocarbons: Alkanes (CₙH₂ₙ₊₂, substitution reactions), Alkenes (CₙH₂ₙ, addition reactions, decolorize bromine water), Alkynes (CₙH₂ₙ₋₂).
- Functional Groups: Alkanols (-OH), Alkanoic acids (-COOH), Esters (-COO-), Alkanal (-CHO), Alkanone (C=O).

💡 Practical Chemistry Tip: For WAEC qualitative analysis, know the test for confirmatory ions (Fe²⁺ dirty green ppt, Fe³⁺ reddish-brown ppt, Cu²⁺ blue ppt soluble in excess NH₃ to give deep blue solution, SO₄²⁻ with BaCl₂/dilute HCl to give white precipitate insoluble in acid)!`;
  }

  // 4. Biology Concepts
  if (
    q.includes('biology') ||
    q.includes('mitosis') ||
    q.includes('meiosis') ||
    q.includes('genetics') ||
    q.includes('photosynthesis') ||
    q.includes('cell') ||
    q.includes('dna')
  ) {
    return `Core Biology Concepts Explained:

1. Mitosis vs Meiosis:
- Mitosis: Occurs in somatic (vegetative/body) cells for growth, tissue repair, and asexual reproduction. Produces 2 genetically identical diploid (2n) daughter cells.
- Meiosis: Occurs in reproductive cells (gonads) to produce gametes (sperm and ova). Involves two successive divisions resulting in 4 genetically varied haploid (n) daughter cells. Essential for maintaining chromosome numbers across generations and enabling genetic variation (crossing over).

2. Genetics & Mendelian Inheritance:
- Monohybrid Cross: F1 generation shows 100% dominant phenotype; F2 generation has a 3:1 phenotypic ratio and 1:2:1 genotypic ratio.
- Blood Group Inheritance: ABO system with alleles Iᴬ, Iᴮ (co-dominant), and i (recessive). Rhesus factor (Rh⁺ is dominant over Rh⁻).
- Sickle Cell Trait: HbA (normal) and HbS (sickle). Genotypes: AA (normal), AS (carrier trait), SS (sickle cell disease). AS × AS cross yields 25% AA, 50% AS, 25% SS.

3. Photosynthesis Equation:
- 6CO₂ + 6H₂O + Sunlight/Chlorophyll → C₆H₁₂O₆ (Glucose) + 6O₂

💡 WAEC Drawing Tip: Biological diagrams must have: a clean non-wavy line, no shading/artistic coloring, title in capital letters below or above, and straight horizontal guide lines for labels!`;
  }

  // 5. Aggregate Calculation (UNILAG, UI, FUTA, General)
  if (
    q.includes('aggregate') ||
    q.includes('unilag aggregate') ||
    q.includes('ui aggregate') ||
    q.includes('post-utme score') ||
    q.includes('calculate score') ||
    q.includes('point')
  ) {
    return `How to Calculate Post-UTME Aggregate Scores in Nigerian Universities:

1. The UNILAG 50:30:20 Aggregate Model:
- Total = 100%
- JAMB Score (50%): Divide your JAMB score by 8. (Example: 280 / 8 = 35.0%)
- Post-UTME Exam (30%): Scaled directly to 30. (Example: 24/30 = 24.0%)
- O'Level 5 Core Subjects (20%): Points per subject: A1 = 4.0, B2 = 3.6, B3 = 3.2, C4 = 2.8, C5 = 2.4, C6 = 2.0. Max = 5 × 4.0 = 20.0%.
- Sum = JAMB + Post-UTME + O'Level = Your Final Aggregate.

2. The University of Ibadan (UI) 50:50 Model:
- JAMB Score (50%): Divide JAMB score by 8. (Max = 400 / 8 = 50.0%)
- UI Post-UTME (50%): Divide your Post-UTME test score (out of 100) by 2.
- Total UI Aggregate = (JAMB / 8) + (Post-UTME / 2).

3. Universities with Screening / O'Level Point Systems (e.g. FUTA, UNN, OAU):
- Some institutions use a 50% JAMB + 50% Post-UTME or O'Level grading scale.
- Check whether your target institution conducts an online computer-based screening test or purely an O'Level points verification screening.

💡 Advice: Never take Post-UTME lightly! Even if your JAMB score is modest, scoring 26/30 or 85/100 in Post-UTME can catapult your total aggregate into the top merit bracket!`;
  }

  // 6. CGPA and University Academic Grading
  if (
    q.includes('cgpa') ||
    q.includes('gpa') ||
    q.includes('first class') ||
    q.includes('credit unit') ||
    q.includes('second class') ||
    q.includes('carry over') ||
    q.includes('probation')
  ) {
    return `Understanding University CGPA & Grading Scale in Nigeria (5.0 Scale):

1. The NUC 5.0 Point Grading System:
- Score 70% – 100%: Grade A = 5.0 points
- Score 60% – 69%: Grade B = 4.0 points
- Score 50% – 59%: Grade C = 3.0 points
- Score 45% – 49%: Grade D = 2.0 points
- Score 40% – 44%: Grade E = 1.0 point
- Score 0% – 39%: Grade F = 0.0 point (Carry Over / Fail)

2. Formula for Grade Point Average (GPA):
- GPA = Total Quality Points (TQP) / Total Credit Units (TCU)
- Quality Point for each course = Credit Units × Grade Point earned.
- Example: If you score an 'A' in a 3-unit course (MTH 101), your Quality Points = 3 × 5 = 15.
- Cumulative GPA (CGPA) is the weighted average across all semesters completed to date.

3. Degree Classifications:
- First Class Honours: 4.50 – 5.00 CGPA
- Second Class Upper (2:1): 3.50 – 4.49 CGPA
- Second Class Lower (2:2): 2.40 – 3.49 CGPA
- Third Class: 1.50 – 2.39 CGPA
- Below 1.50: Academic Warning or Probation (students failing to clear probation face withdrawal).

💡 First Class Strategy: Protect your 100 Level first semester GPA! It is mathematically 3× easier to maintain a high GPA from Year 1 than to pull up a low 2.2 in Year 3 or 4.`;
  }

  // 7. Combining WAEC and NECO / Two Sittings
  if (
    q.includes('combine') ||
    q.includes('two sittings') ||
    q.includes('waec and neco') ||
    q.includes('two sitting') ||
    q.includes('sitting')
  ) {
    return `Rules on Combining WAEC and NECO Results for University Admissions:

1. Is Combining Results Allowed?
- YES! Over 90% of Nigerian universities (federal, state, and private) accept a combination of two sittings (e.g. WAEC + NECO, WAEC + WAEC, or NECO + NECO).

2. Important Exceptions:
- Medicine and Surgery (MBBS): Certain premier federal universities (such as University of Ibadan, UNILAG, or UNN) periodically require a single-sitting O'Level for MBBS. Always check the official departmental brochure for that specific year.
- Law and Pharmacy: Accepted by almost all institutions in two sittings, provided you meet the 5 required credits in not more than two sittings.

3. Mandatory 5 Credit Baseline:
- English Language and Mathematics are compulsory for almost all courses.
- The 3 other subjects must correspond directly to your faculty requirements.

💡 Action Tip: When registering on JAMB CAPS, ensure both exam center numbers and candidate numbers are accurately uploaded so JAMB can verify both results simultaneously!`;
  }

  // 8. General Study Techniques & Exam Success
  if (
    q.includes('study') ||
    q.includes('memoriz') ||
    q.includes('focus') ||
    q.includes('exam tips') ||
    q.includes('pass waec') ||
    q.includes('read')
  ) {
    return `Effective Academic Study Strategies for Nigerian Students:

1. Active Recall & The Feynman Technique:
- Don't just passively read textbooks or notes. Close the book and explain the concept out loud in plain, simple English as if teaching a junior secondary student.
- If you get stuck at any step, re-read that specific paragraph.

2. Spaced Repetition System:
- Review your notes at spaced intervals: Day 1 (immediate study), Day 3 (quick 10-minute recap), Day 7 (practice question test), Day 21 (comprehensive revision). This transfers information from short-term to permanent memory.

3. Past Questions (The Golden Key):
- Solve at least the last 10 years of WAEC/JAMB past questions.
- Identify recurring topics (JAMB UTME repeatedly tests the same core syllabus areas in Physics, Chemistry, Government, and Literature).
- Time yourself strictly under exam conditions.

4. Form High-Accountability Study Circles:
- Study with 2–3 serious peers where each member is assigned a topic to master and teach the group weekly.`;
  }

  // 9. Low Score / Cut-off Pivot
  if (
    q.includes('198') ||
    q.includes('score') ||
    q.includes('cut-off') ||
    q.includes('cutoff') ||
    q.includes('pivot')
  ) {
    return `With a score around 180–210 in JAMB, here is the realistic, strategic breakdown:

1. Direct University Medicine/Surgery or Law:
- Direct entry into premier federal institutions (UI, UNILAG, UNN, OAU) strictly requires 260–280+ due to nationwide applicant volume.

2. High-Probability Alternative Tracks:
- Commercial / Finance: If cut-off for Accounting is high, switch to Banking & Finance, Insurance, or enroll in ICAN ATSWA.
- Social Sciences & Media: Switch to Criminology, Sociology, or accept an accredited ND in Mass Communication at YABATECH or MAPOLY.
- Medical Laboratory Science (SLT track): Enroll in an accredited National Diploma in Science Laboratory Technology. A graduating CGPA of 3.5+ (Upper Credit) guarantees Direct Entry into 200 Level at UNILORIN, UNN, or ABU.
- Human Physiology or Anatomy: Frequently offered at 190–210 across federal and state universities. Students excelling in Year 1 can often apply for intra-university transfers.
- State Colleges of Nursing Sciences: 3-year Registered Nurse (RN) diplomas offer affordable state fees and bypass JAMB merit rat-races.

💡 Action Tip: Do not leave your JAMB CAPS on a course that has already filled its merit quota. Change your course early before Post-UTME screening closes!`;
  }

  // 10. Law / Commercial / Arts / Education
  if (q.includes('law') || q.includes('legal') || q.includes('ll.b') || q.includes('bar')) {
    return `Navigating Law (LL.B) Admissions in Nigeria:

1. Mandatory Subject Combination:
- WAEC/NECO: 5 Credits including English Language, Literature-in-English, and Mathematics, plus Government or CRS/IRS.
- JAMB UTME: English Language, Literature-in-English, and two Arts/Social Science subjects (Government and CRS/IRS are most common).

2. Cut-Off Marks & Competition:
- Premier Federal Universities (UNILAG, UI, UNN, OAU, ABU Zaria): Merit cut-off is typically 265–285+.
- State Universities (LASU, OOU, AAUA, DELSU): 240–260.

3. Realistic Plan B Routes:
- University Diploma in Law: Institutions like LASU, UNIJOS, and DELSU offer 2-year Law Diplomas. Upper Credit awards Direct Entry into 200 Level LL.B.
- Alternative Degrees: If your score is 210–235, switch to Criminology & Security Studies or Political Science. You can complete a first degree and enter 200L Law as a graduate!`;
  }

  if (q.includes('accounting') || q.includes('accountant') || q.includes('finance') || q.includes('commercial') || q.includes('ican')) {
    return `Accounting & Commercial Careers in Nigeria:

1. Mandatory Subject Combination:
- WAEC/NECO: 5 Credits including English, Mathematics, Economics, and Financial Accounting or Commerce.
- JAMB UTME: English, Mathematics, Economics, and Financial Accounting or Commerce.

2. The Fast-Track: ICAN ATSWA Route:
- You don't have to wait for university admission to start your professional journey.
- The Accounting Technicians Scheme West Africa (ATSWA) allows secondary school leavers to take foundational ICAN stages.
- Passing ATSWA qualifies you for Direct Entry into 200 Level in most Nigerian universities, with direct exemptions from ICAN Foundation exam stages!

3. Poly to University:
- An ND in Accountancy with Upper Credit from YABATECH, Fed Poly Ilaro, or Kaduna Poly gives 200L Direct Entry access.`;
  }

  if (q.includes('direct entry') || q.includes('polytechnic') || q.includes('poly') || q.includes('de')) {
    return `How Direct Entry (DE) Works in Nigeria:

1. The Pathway: Instead of retaking JAMB UTME repeatedly after secondary school, you complete a 2-year National Diploma (ND), JUPEB, or IJMB program.
2. The Golden Rule: You must graduate with at least an Upper Credit (3.00 - 3.49+ CGPA). Most federal universities prioritize Upper Credit and Distinction applicants.
3. Skip 100 Level Waste: You register for the JAMB Direct Entry portal and matriculate directly into 200 Level in your target university, preserving your academic timeline.
4. Subject Synergy: Verify that your ND course is accredited by NBTE and aligns with your degree (for example: ND Computer Science into B.Sc Software Engineering; ND Science Lab Tech into B.MLS Medical Laboratory Science).`;
  }

  if (q.includes('catchment') || q.includes('merit')) {
    return `Catchment Area vs Merit List Explained Simply:

Under National Universities Commission (NUC) and Federal Ministry of Education guidelines, federal tertiary admissions follow a structured distribution:

1. 45% National Merit: Allocated strictly to the highest qualifying scores nationwide, regardless of the applicant's state of origin.
2. 35% Catchment Area: Reserved for applicants originating from geographically contiguous states to that university. For example, UNILAG catchment covers Lagos, Ogun, Oyo, Osun, Ondo, and Ekiti. A candidate from Lagos may gain admission with a score 15–20 points lower than an applicant outside these states.
3. 20% Educationally Less Developed States (ELDS): Dedicated to specific designated states to ensure balanced national educational access.

💡 Advice: Always check your State of Origin's home federal university to benefit from the catchment score advantage!`;
  }

  if (q.includes('nursing') || q.includes('nurse')) {
    return `Navigating Nursing Science in Nigeria:

1. University B.N.Sc Degree (5 Years): Awarded by accredited universities like UNILAG, UI, and OAU. Leads to dual RN/RM/RPHN licensure. Highly competitive with merit cut-offs usually starting from 240+.
2. State College of Nursing Sciences (RN Diploma): Regulated directly by the Nursing and Midwifery Council of Nigeria (NMCN). Requires 5 WAEC credits (English, Maths, Bio, Chem, Phy) and entrance exams, bypassing university JAMB quotas.
3. Direct Entry Upgrade: After acquiring your RN license and completing hospital internship, you can enter university at 200 Level or 300 Level for degree completion.

💡 Action Tip: If your JAMB score is under 220, obtain the entrance form for your state's College of Nursing immediately as a high-security Plan B!`;
  }

  if (q.includes('scholarship') || q.includes('grant') || q.includes('funding')) {
    return `Tertiary Admission Scholarships for Nigerian Students:

1. Corporate Oil & Energy Schemes: NNPC/TotalEnergies, Chevron Agbami, SEPLAT JV, and Shell SPDC open applications annually for 100L and 200L students (paying ₦150,000 - ₦250,000/year).
2. Tech & Telecom Grants: MTN Foundation Science & Technology Scholarship awards ₦300,000 annually to female STEM students maintaining a 3.5+ CGPA.
3. State Government Bursaries: Many state scholarship boards (e.g. Lagos, Delta, Kano, Rivers) provide annual bursaries for indigenous students in tertiary institutions.

💡 Advice: Most corporate scholarships require an active 100L or 200L matriculation number. Open the Grants tab right here in CarEdPath NG to see verified eligibility and deadlines!`;
  }

  // 11. General Academic Fallback with Structured Guidance
  return `That is a great academic question! Here is a structured breakdown:

1. Core Academic Foundations:
- Ensure your foundational concepts are solid: understand first principles, definitions, and key formulas before attempting complex problems.
- Cross-reference with the official WAEC, NECO, or JAMB UTME syllabus to verify exam topic weightings.

2. Step-by-Step Problem Solving:
- Break down multi-step problems into smaller, manageable sub-steps.
- Write down given parameters, state applicable laws or theorems, and verify dimensional units.

3. Relevant Subject Combinations & Synergies:
- Always ensure your O'Level and UTME subject combinations strictly align with the National Universities Commission (NUC) and JAMB IBASS brochure requirements.

4. Actionable Next Step:
- You can ask me to explain a specific formula, derive a concept in Physics/Chemistry/Maths, calculate your university aggregate, or outline a personalized study timetable!`;
}

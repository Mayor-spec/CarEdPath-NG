import React from 'react';

interface MentorMessageRendererProps {
  rawText: string;
  sender: 'ai' | 'user';
}

/**
 * Strips raw markdown asterisks and returns styled spans for bold phrases
 */
const renderInlineFormatted = (text: string): React.ReactNode => {
  // Regex to match **bold text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const clean = part.slice(2, -2).trim();
      return (
        <strong
          key={index}
          className="font-semibold text-[#0a192f] bg-blue-50/70 px-1 py-0.5 rounded text-[13px] border border-blue-100/50"
        >
          {clean}
        </strong>
      );
    }
    // Remove any accidental lone asterisks
    const cleanedText = part.replace(/\*\*/g, '');
    return <span key={index}>{cleanedText}</span>;
  });
};

export const MentorMessageRenderer: React.FC<MentorMessageRendererProps> = ({ rawText, sender }) => {
  if (sender === 'user') {
    return <div className="leading-relaxed whitespace-pre-wrap">{rawText}</div>;
  }

  // Pre-clean any raw double asterisks from lines
  const lines = rawText.split('\n');

  // Group lines into sections
  const elements: React.ReactNode[] = [];
  let currentList: { number?: string; title: string; content: string }[] = [];
  let currentBulletList: { title?: string; content: string }[] = [];

  const flushNumberedList = () => {
    if (currentList.length > 0) {
      const listToRender = [...currentList];
      currentList = [];
      elements.push(
        <div key={`num-list-${elements.length}`} className="flex flex-col gap-2.5 my-2">
          {listToRender.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3 transition-all hover:border-slate-300"
            >
              <div className="w-6 h-6 rounded-full bg-[#0a192f] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.number || `${idx + 1}`}
              </div>
              <div className="flex flex-col gap-0.5 text-[13px] sm:text-[13.5px] leading-relaxed flex-1">
                {item.title && (
                  <span className="font-semibold text-[#0a192f] tracking-tight">
                    {renderInlineFormatted(item.title)}
                  </span>
                )}
                <div className="text-slate-700">
                  {renderInlineFormatted(item.content)}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  const flushBulletList = () => {
    if (currentBulletList.length > 0) {
      const listToRender = [...currentBulletList];
      currentBulletList = [];
      elements.push(
        <div key={`bullet-list-${elements.length}`} className="flex flex-col gap-2 my-2">
          {listToRender.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-2.5 text-[13px] leading-relaxed"
            >
              <span className="material-symbols-outlined text-[#dc2626] text-[16px] flex-shrink-0 mt-0.5">
                check_circle
              </span>
              <div className="flex flex-col gap-0.5 flex-1 text-slate-800">
                {item.title && (
                  <span className="font-semibold text-[#0a192f]">
                    {renderInlineFormatted(item.title)}
                  </span>
                )}
                <span className="text-slate-700">
                  {renderInlineFormatted(item.content)}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;

    // Check for Action Tip or Advice (with 💡 emoji or Tip label)
    if (rawLine.includes('💡') || rawLine.toLowerCase().startsWith('action tip:') || rawLine.toLowerCase().startsWith('advice:')) {
      flushNumberedList();
      flushBulletList();
      const cleanedTip = rawLine.replace(/💡/g, '').replace(/\*\*/g, '').trim();
      elements.push(
        <div
          key={`tip-${i}`}
          className="my-3 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90 text-amber-950 flex items-start gap-3 shadow-2xs"
        >
          <div className="w-7 h-7 rounded-lg bg-amber-200/60 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
          </div>
          <div className="text-[13px] leading-relaxed flex-1">
            <strong className="font-bold text-amber-950 block text-[13.5px] mb-0.5">
              Mentor Practical Guidance
            </strong>
            <p className="text-amber-900 leading-normal">
              {renderInlineFormatted(cleanedTip)}
            </p>
          </div>
        </div>
      );
      continue;
    }

    // Check for Numbered List Item (e.g. "1. **Direct University Medicine...**" or "1. Direct University...")
    const numberedMatch = rawLine.match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      flushBulletList();
      const num = numberedMatch[1];
      let rest = numberedMatch[2];

      // Extract title if separated by colon or bold
      let title = '';
      let content = rest;

      if (rest.includes(':')) {
        const colonIdx = rest.indexOf(':');
        title = rest.slice(0, colonIdx).replace(/\*\*/g, '').trim();
        content = rest.slice(colonIdx + 1).replace(/\*\*/g, '').trim();
      } else {
        // If whole thing is bold or plain
        content = rest.replace(/\*\*/g, '').trim();
      }

      currentList.push({
        number: `0${num}`,
        title,
        content
      });
      continue;
    }

    // Check for Bullet points (e.g. "- **Medical Lab Science:** ..." or "- Required WAEC/NECO: ...")
    const bulletMatch = rawLine.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      flushNumberedList();
      const rest = bulletMatch[1];
      let title = '';
      let content = rest;

      if (rest.includes(':')) {
        const colonIdx = rest.indexOf(':');
        title = rest.slice(0, colonIdx).replace(/\*\*/g, '').trim();
        content = rest.slice(colonIdx + 1).replace(/\*\*/g, '').trim();
      } else {
        content = rest.replace(/\*\*/g, '').trim();
      }

      currentBulletList.push({
        title,
        content
      });
      continue;
    }

    // Check for Section Headers (e.g. "**How Direct Entry (DE) Works in Nigeria:**" or ending in colon)
    const isHeaderLine = (rawLine.startsWith('**') && rawLine.endsWith('**')) ||
                         (rawLine.endsWith(':') && rawLine.length < 90 && !rawLine.includes('.')) ||
                         rawLine.startsWith('How Direct Entry') ||
                         rawLine.startsWith('Software Engineering & Tech') ||
                         rawLine.startsWith('Catchment Area vs Merit');

    if (isHeaderLine) {
      flushNumberedList();
      flushBulletList();
      const cleanHeader = rawLine.replace(/\*\*/g, '').trim();
      elements.push(
        <div key={`header-${i}`} className="mt-3 mb-1.5 flex items-center gap-2">
          <span className="w-2 h-4 rounded-full bg-[#dc2626]" />
          <h4 className="font-serif-headline text-[15px] sm:text-[16px] font-bold text-[#0a192f]">
            {cleanHeader}
          </h4>
        </div>
      );
      continue;
    }

    // Regular paragraph or statement
    flushNumberedList();
    flushBulletList();

    // Check if it's an introductory statement or closing statement
    const cleanParagraph = rawLine.replace(/\*\*/g, '').trim();
    elements.push(
      <p
        key={`para-${i}`}
        className="text-[13px] sm:text-[13.5px] text-slate-800 leading-relaxed sm:leading-relaxed"
      >
        {renderInlineFormatted(cleanParagraph)}
      </p>
    );
  }

  flushNumberedList();
  flushBulletList();

  return <div className="space-y-2">{elements}</div>;
};

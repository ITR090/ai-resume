import React from 'react'

// Minimal, dependency-free Markdown renderer for the AI output.
// Builds React elements (no innerHTML), so model output can't inject markup.

const INLINE = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]\n]{1,40}\](?!\())/g;

function renderInline(text, keyPrefix) {
  return text.split(INLINE).filter(Boolean).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      return <strong key={key} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={key} className="rounded bg-base-300 px-1 text-[0.9em]">{part.slice(1, -1)}</code>;
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('[') && part.endsWith(']')) {
      // Placeholders like [Phone Number] the user still needs to fill in
      return <mark key={key} className="rounded bg-warning/25 px-1 text-inherit">{part}</mark>;
    }
    return part;
  });
}

function parseBlocks(markdown) {
  const blocks = [];
  let paragraph = [];
  let list = null;

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: 'p', lines: paragraph });
    paragraph = [];
  };
  const flushList = () => {
    if (list) blocks.push(list);
    list = null;
  };

  for (const raw of markdown.replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.trimEnd();
    const heading = line.match(/^\s*(#{1,6})\s+(.*)$/);
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);

    if (!line.trim()) {
      flushParagraph();
      flushList();
    } else if (/^\s*([-*_])\1{2,}\s*$/.test(line)) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'hr' });
    } else if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'h', level: heading[1].length, text: heading[2] });
    } else if (bullet || numbered) {
      flushParagraph();
      const type = bullet ? 'ul' : 'ol';
      if (list?.type !== type) {
        flushList();
        list = { type, items: [] };
      }
      list.items.push((bullet || numbered)[1]);
    } else {
      flushList();
      paragraph.push(line.trim());
    }
  }
  flushParagraph();
  flushList();
  return blocks;
}

const headingClasses = {
  1: 'mt-2 text-2xl font-bold tracking-tight',
  2: 'mt-6 border-b border-base-300 pb-1 text-base font-bold uppercase tracking-wide text-primary first:mt-0',
  3: 'mt-4 font-semibold',
};

export default function MarkdownView({ content }) {
  return (
    <div className="space-y-2 leading-relaxed" dir="auto">
      {parseBlocks(content).map((block, i) => {
        const key = `b-${i}`;
        switch (block.type) {
          case 'h': {
            const Tag = `h${Math.min(block.level + 1, 6)}`;
            return <Tag key={key} className={headingClasses[block.level] ?? headingClasses[3]}>{renderInline(block.text, key)}</Tag>;
          }
          case 'ul':
          case 'ol': {
            const Tag = block.type;
            return (
              <Tag key={key} className={`space-y-1 ps-5 ${block.type === 'ul' ? 'list-disc' : 'list-decimal'} marker:text-primary`}>
                {block.items.map((item, j) => <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>)}
              </Tag>
            );
          }
          case 'hr':
            return <hr key={key} className="my-4 border-base-300" />;
          default:
            return (
              <p key={key}>
                {block.lines.map((line, j) => (
                  <React.Fragment key={`${key}-${j}`}>
                    {j > 0 && <br />}
                    {renderInline(line, `${key}-${j}`)}
                  </React.Fragment>
                ))}
              </p>
            );
        }
      })}
    </div>
  );
}

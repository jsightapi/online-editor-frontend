import React from 'react';

interface RegexViewProps {
  content: string;
  tab: number;
}

export const RegexView = ({content, tab}: RegexViewProps) => {
  return (
    <span className="code-line">
      <span className="number" />
      <span className="required" />
      <span>{' '.repeat(tab)}</span>
      <span>{content}</span>
    </span>
  );
};

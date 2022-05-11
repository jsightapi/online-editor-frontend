import React from 'react';

interface BracketCloseProps {
  tab: number;
  bracket: string;
}

export const BracketClose = ({tab, bracket}: BracketCloseProps) => (
  <span className="code-line">
    <span className="number" />
    <span className="required not">
      <i className="icon-star" />
    </span>
    <span>{' '.repeat(tab)}</span>
    <span className="punctuation-char">{bracket}</span>
  </span>
);

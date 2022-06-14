import React from 'react';
import './TextWithTooltip.styles.scss';

interface TextWithTooltipProps {
  text: string;
}

export const TextWithTooltip = ({text}: TextWithTooltipProps) => {
  return (
    <div className="text-with-tooltip">
      <div className="cut-text">{text}</div>
      <div className="full-text">{text}</div>
    </div>
  );
};

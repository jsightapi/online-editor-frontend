import {FC} from 'react';
import './TextWithTooltip.styles.scss';

interface TextWithTooltipProps {
  text: string;
}

export const TextWithTooltip: FC<TextWithTooltipProps> = ({text}) => {
  return (
    <div className="text-with-tooltip">
      <div className="cut-text">{text}</div>
      <div className="full-text">{text}</div>
    </div>
  );
};

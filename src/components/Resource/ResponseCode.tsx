import React, {useMemo} from 'react';
import clsx from 'clsx';
import './ResponseCode.styles.scss';

interface ResponseCodeProps {
  code: string;
  annotation?: string;
}

export const ResponseCode = ({code, annotation}: ResponseCodeProps) => {
  const className = useMemo(() => {
    const codeNumber = parseInt(code);
    if (codeNumber >= 100 && codeNumber < 200) {
      return 'code-100';
    } else if (codeNumber >= 200 && codeNumber < 300) {
      return 'code-200';
    } else if (codeNumber >= 300 && codeNumber < 400) {
      return 'code-300';
    } else if (codeNumber >= 400 && codeNumber < 500) {
      return 'code-400';
    } else if (codeNumber >= 500 && codeNumber < 600) {
      return 'code-500';
    }
    return 'code-other';
  }, [code]);

  return (
    <div className="response-header d-flex">
      <div className={clsx(['code', className])}>{code}</div>
      {annotation && <div className="annotation">{annotation}</div>}
    </div>
  );
};

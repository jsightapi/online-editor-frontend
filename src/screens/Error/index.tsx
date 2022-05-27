import React, {useMemo} from 'react';
import './ErrorScreen.styles.scss';
import Error40x from 'assets/images/error40x.svg';
import Error50x from 'assets/images/error50x.svg';
import {Button} from 'components/Button';

interface ErrorScreenProps {
  message: string;
  code: number;
  goToEditor(): void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({code, message, goToEditor}) => {
  const isError40x = useMemo(() => {
    return code >= 400 && code < 500;
  }, [code]);

  return (
    <div className="d-flex error-wrapper">
      <div className="d-flex error-inner">
        <div className="image">{isError40x ? <img src={Error40x} /> : <img src={Error50x} />}</div>
        <div className="d-flex content">
          <div className="title">Error {code}</div>
          <div className="description">{message}</div>
          <Button onClick={goToEditor}>Go to Editor</Button>
        </div>
      </div>
    </div>
  );
};

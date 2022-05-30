import React, {useEffect} from 'react';
import {ApiInfoType} from 'types/exchange';
import {Description} from '../Description';
import './ApiInfo.styles.scss';

const DEFAULT_TITLE = 'JSight Online Editor';

interface ApiInfoProps {
  apiInfo?: ApiInfoType;
}

export const ApiInfo = ({apiInfo}: ApiInfoProps) => {
  useEffect(() => {
    document.title = apiInfo?.title || DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [apiInfo?.title]);

  return apiInfo ? (
    <div className="api-info">
      <h1>{apiInfo.title}</h1>
      {apiInfo.version && (
        <div className="version">
          <strong>API version:</strong> {apiInfo.version}
        </div>
      )}
      <Description markdown={apiInfo.description} />
    </div>
  ) : null;
};

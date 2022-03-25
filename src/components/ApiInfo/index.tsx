import React, {FC, useEffect} from 'react';
import './ApiInfo.styles.scss';
import {ApiInfoType} from 'api/getResources.model';
import {Description} from '../Description';

const DEFAULT_TITLE = 'JSight Online Editor';

interface ApiInfoProps {
  apiInfo?: ApiInfoType;
}

export const ApiInfo: FC<ApiInfoProps> = ({apiInfo}) => {
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

import React from 'react';
import {ResponseCode} from 'components/Resource/ResponseCode';
import {ResourceBlock} from 'components/Resource/ResourceBlock';
import {HttpResponseType} from 'types';

interface ResourceResponsesProps {
  responses: HttpResponseType[];
  resourceKey: string;
  indexMethod: number;
  headersBodiesViewMode: 'code' | 'table';
}

export const HttpResponses = ({
  responses,
  resourceKey,
  indexMethod,
  headersBodiesViewMode,
}: ResourceResponsesProps) => {
  return (
    <>
      <div className="responses">Responses</div>
      {responses.map((response, index) => (
        <div key={`response-${response.code}-${index}`}>
          <ResponseCode code={response.code} annotation={response.annotation} />
          {response.headers && (
            <div style={{marginBottom: '3.2rem'}}>
              <ResourceBlock
                keyBlock={`${resourceKey}-${indexMethod}-6-rh-${index}`}
                typeBlock={'header-body'}
                title="Response headers"
                type={headersBodiesViewMode}
                data={response.headers}
                block="header"
              />
            </div>
          )}
          <ResourceBlock
            keyBlock={`${resourceKey}-${indexMethod}-6-rb-${index}`}
            typeBlock={'header-body'}
            title="Response body"
            type={headersBodiesViewMode}
            data={response.body}
          />
        </div>
      ))}
    </>
  );
};

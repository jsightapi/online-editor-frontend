import React, {useCallback, useContext, useMemo} from 'react';
import {GlobalSettingsContext, MainContext} from 'store';
import {HttpInteractionType} from 'types';
import {HttpMethodsTabs} from './HttpMethodsTabs';
import clsx from 'clsx';
import {Description} from 'components/Description';
import {ResourceBlock} from 'components/Resource/ResourceBlock';
import {HttpResponses} from 'components/Resource/Http/HttpResponses';
import './HttpResource.styles.scss';
import '../Resource.styles.scss';

interface HttpResourceProps {
  interactions: HttpInteractionType[];
  resourceKey: string;
  index: number;
  path: string;
}

export const HttpResource = ({interactions, resourceKey, index, path}: HttpResourceProps) => {
  const {headersBodiesTypesCode, pathQueriesCode, tabs} = useContext(GlobalSettingsContext);
  const {resourceState, setResourceState} = useContext(MainContext);

  const currentMethod = useMemo(() => {
    const method = resourceState[index]?.method;

    return interactions.find((item) => (method ? item.httpMethod === method : true));
  }, [index, interactions, resourceState]);

  const setHttpMethod = useCallback(
    (method: string) => {
      setResourceState((prev) => prev.map((prevItem, i) => (i === index ? {method} : prevItem)));
    },
    [index]
  );

  const pathQueriesViewMode = useMemo(() => (pathQueriesCode ? 'code' : 'table'), [
    pathQueriesCode,
  ]);

  const headersBodiesViewMode = useMemo(() => (headersBodiesTypesCode ? 'code' : 'table'), [
    headersBodiesTypesCode,
  ]);

  const getDisplayValue = (httpMethod: string) =>
    tabs ? (httpMethod === currentMethod?.httpMethod ? 'flex' : 'none') : 'flex';

  return (
    <div className="resource-wrapper">
      <h3>{path}</h3>
      {tabs && (
        <HttpMethodsTabs
          methods={interactions.map((interaction) => interaction.httpMethod)}
          setHttpMethod={setHttpMethod}
          currentHttpMethod={currentMethod?.httpMethod}
        />
      )}
      {interactions.map((item, indexMethod) => (
        <div
          key={`resource-${item.httpMethod}-${item.path}`}
          className="resource-content"
          style={{
            display: getDisplayValue(item.httpMethod),
          }}
        >
          {!tabs && (
            <div className="d-flex method-label-wrapper">
              <div className={clsx(['method-label', item.httpMethod.toLowerCase()])}>
                {item.httpMethod}
              </div>
              {item.annotation && <h4 className="method-annotation">{item.annotation}</h4>}
            </div>
          )}
          {item.annotation && tabs && <h4 className="method-annotation">{item.annotation}</h4>}
          {item.description && <Description markdown={item.description} />}
          {item.pathVariables && (
            <ResourceBlock
              title="Path parameters"
              keyBlock={`${resourceKey}-${indexMethod}-1`}
              typeBlock={'path-query'}
              type={pathQueriesViewMode}
              data={{
                format: 'json',
                schema: item.pathVariables?.schema,
              }}
              block="path"
            />
          )}
          {item.query?.example && (
            <ResourceBlock
              keyBlock={`${path}-${indexMethod}-2`}
              title="Query"
              type={'example'}
              data={item.query}
            />
          )}
          {item.query?.schema && (
            <ResourceBlock
              keyBlock={`${path}-${indexMethod}-3`}
              title="Query"
              typeBlock={'path-query'}
              hideTitle={!!item.query?.example}
              type={pathQueriesViewMode}
              data={item.query}
            />
          )}
          {item.request && (
            <>
              {item.request.headers && (
                <ResourceBlock
                  keyBlock={`${path}-${indexMethod}-4`}
                  title="Request headers"
                  type={headersBodiesViewMode}
                  typeBlock={'header-body'}
                  data={item.request.headers}
                  block="header"
                />
              )}
              <ResourceBlock
                keyBlock={`${path}-${indexMethod}-5`}
                title="Request body"
                typeBlock={'header-body'}
                type={headersBodiesViewMode}
                data={item.request.body}
              />
            </>
          )}
          {item.responses && (
            <HttpResponses
              responses={item.responses}
              resourceKey={path}
              indexMethod={indexMethod}
              headersBodiesViewMode={headersBodiesViewMode}
            />
          )}
        </div>
      ))}
    </div>
  );
};

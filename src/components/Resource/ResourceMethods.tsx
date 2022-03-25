import React, {useContext, useMemo, FC} from 'react';
import {ResourceType} from 'api/getResources.model';
import clsx from 'clsx';
import {ResourceBlock} from './ResourceBlock';
import {ResponseCode} from './ResponseCode';
import {GlobalSettingsContext} from '../Layout';
import './ResourceMethods.styles.scss';
import {Description} from '../Description';
import {MainContext} from 'components/MainContent';

interface ResourceMethodsProps {
  methods: ResourceType[];
  resourceKey: string;
  index: number;
}

export const ResourceMethods: FC<ResourceMethodsProps> = ({methods, resourceKey, index}) => {
  const {headersBodiesCode, pathQueriesCode} = useContext(GlobalSettingsContext);
  const {resourceState, setResourceState} = useContext(MainContext);

  const currentMethod = useMemo(() => {
    const method = resourceState[index].method;
    return methods.find((item) => (method ? item.httpMethod === method : true));
  }, [index, methods, resourceState]);

  const pathQueriesViewMode = useMemo(
    () => (pathQueriesCode ? 'code' : 'table'),
    [pathQueriesCode]
  );

  const headersBodiesViewMode = useMemo(
    () => (headersBodiesCode ? 'code' : 'table'),
    [headersBodiesCode]
  );

  return (
    <>
      <div className="methods-tab d-flex">
        {methods.map((item) => (
          <button
            onClick={(e) => {
              e.preventDefault();
              setResourceState((prev) =>
                prev.map((prevItem, i) => (i === index ? {method: item.httpMethod} : prevItem))
              );
            }}
            key={`tab-${item.httpMethod}-${item.path}`}
            className={clsx([
              {active: currentMethod?.httpMethod === item.httpMethod},
              item.httpMethod.toLowerCase(),
            ])}
          >
            {item.httpMethod}
          </button>
        ))}
      </div>
      {methods.map((item, indexMethod) => (
        <div
          key={`resource-${item.httpMethod}-${item.path}`}
          className="resource-content"
          style={{display: item.httpMethod === currentMethod?.httpMethod ? 'block' : 'none'}}
        >
          {item.annotation && <h4 className="item-annotation">{item.annotation}</h4>}
          <Description markdown={item.description} />
          {item.pathVariables && (
            <ResourceBlock
              title="Path parameters"
              keyBlock={`${resourceKey}-${indexMethod}-1`}
              type={pathQueriesViewMode}
              data={{
                format: 'json',
                schema: item.pathVariables?.schema,
              }}
              directiveType="path"
            />
          )}
          {item.query?.example && (
            <ResourceBlock
              keyBlock={`${resourceKey}-${indexMethod}-2`}
              title="Query"
              type={'example'}
              data={item.query}
            />
          )}
          {item.query?.schema && (
            <ResourceBlock
              keyBlock={`${resourceKey}-${indexMethod}-3`}
              title="Query"
              hideTitle={!!item.query?.example}
              type={pathQueriesViewMode}
              data={item.query}
            />
          )}
          {item.request && (
            <>
              {item.request.headers && (
                <ResourceBlock
                  keyBlock={`${resourceKey}-${indexMethod}-4`}
                  title="Request headers"
                  type={pathQueriesViewMode}
                  data={item.request.headers}
                  directiveType="header"
                />
              )}
              <ResourceBlock
                keyBlock={`${resourceKey}-${indexMethod}-5`}
                title="Request body"
                type={headersBodiesViewMode}
                data={item.request.body}
              />
            </>
          )}
          {item.responses && (
            <>
              <div className="title">Responses</div>
              {item.responses.map((response, index) => (
                <div key={`response-${response.code}-${index}`}>
                  <ResponseCode code={response.code} annotation={response.annotation} />
                  {response.headers && (
                    <ResourceBlock
                      keyBlock={`${resourceKey}-${indexMethod}-6-rh-${index}`}
                      title="Response headers"
                      type={pathQueriesViewMode}
                      data={response.headers}
                      directiveType="header"
                    />
                  )}
                  <ResourceBlock
                    keyBlock={`${resourceKey}-${indexMethod}-6-rb-${index}`}
                    title="Response body"
                    type={headersBodiesViewMode}
                    data={response.body}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </>
  );
};

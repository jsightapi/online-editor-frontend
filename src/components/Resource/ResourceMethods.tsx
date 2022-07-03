import React, {useContext, useMemo, useEffect} from 'react';
import {ResourceType} from 'types/exchange';
import clsx from 'clsx';
import {ResourceBlock} from './ResourceBlock';
import {GlobalSettingsContext} from '../Layout';
import {Description} from '../Description';
import {MainContext} from 'store';
import {ResourceMethodsTabs} from 'components/Resource/ResourceMethodsTabs';
import './ResourceMethods.styles.scss';
import {ResourceResponses} from 'components/Resource/ResourceResponses';

interface ResourceMethodsProps {
  methods: ResourceType[];
  resourceKey: string;
  index: number;
}

export const ResourceMethods = ({methods, resourceKey, index}: ResourceMethodsProps) => {
  const {headersBodiesTypesCode, pathQueriesCode, tabs} = useContext(GlobalSettingsContext);
  const {resourceState, setResourceState} = useContext(MainContext);

  const currentMethod = useMemo(() => {
    const method = resourceState[index].method;

    return methods.find((item) => (method ? item.httpMethod === method : true));
  }, [index, methods, resourceState]);

  useEffect(() => {
    if (!currentMethod?.httpMethod) {
      setResourceState((prev) =>
        prev.map((prevItem, i) => (i === index ? {method: methods[0].httpMethod} : prevItem))
      );
    }
  }, [methods]);

  const pathQueriesViewMode = useMemo(() => (pathQueriesCode ? 'code' : 'table'), [
    pathQueriesCode,
  ]);

  const headersBodiesViewMode = useMemo(() => (headersBodiesTypesCode ? 'code' : 'table'), [
    headersBodiesTypesCode,
  ]);

  const setHttpMethod = (method: string) => {
    setResourceState((prev) => prev.map((prevItem, i) => (i === index ? {method} : prevItem)));
  };

  const getDisplayValue = (httpMethod: string) =>
    tabs ? (httpMethod === currentMethod?.httpMethod ? 'flex' : 'none') : 'flex';

  return (
    <>
      {tabs && (
        <ResourceMethodsTabs
          methods={methods}
          setHttpMethod={setHttpMethod}
          currentHttpMethod={currentMethod?.httpMethod}
        />
      )}
      {methods.map((item, indexMethod) => (
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
                  keyBlock={`${resourceKey}-${indexMethod}-4`}
                  title="Request headers"
                  type={headersBodiesViewMode}
                  typeBlock={'header-body'}
                  data={item.request.headers}
                  directiveType="header"
                />
              )}
              <ResourceBlock
                keyBlock={`${resourceKey}-${indexMethod}-5`}
                title="Request body"
                typeBlock={'header-body'}
                type={headersBodiesViewMode}
                data={item.request.body}
              />
            </>
          )}
          {item.responses && (
            <ResourceResponses
              responses={item.responses}
              resourceKey={resourceKey}
              indexMethod={indexMethod}
              headersBodiesViewMode={headersBodiesViewMode}
            />
          )}
        </div>
      ))}
    </>
  );
};

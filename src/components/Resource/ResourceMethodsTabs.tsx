import clsx from 'clsx';
import React from 'react';
import {ResourceType} from 'api/getResources.model';

interface ResourceMethodsTabsProps {
  setHttpMethod(method: string): void;
  methods: ResourceType[];
  currentHttpMethod?: string;
}

export const ResourceMethodsTabs: React.FC<ResourceMethodsTabsProps> = ({
  methods,
  setHttpMethod,
  currentHttpMethod,
}) => {
  return (
    <div className="methods-tab d-flex">
      {methods.map((item) => (
        <button
          onClick={(e) => {
            e.preventDefault();
            setHttpMethod(item.httpMethod);
          }}
          key={`tab-${item.httpMethod}-${item.path}`}
          className={clsx([
            {active: currentHttpMethod === item.httpMethod},
            item.httpMethod.toLowerCase(),
          ])}
        >
          {item.httpMethod}
        </button>
      ))}
    </div>
  );
};

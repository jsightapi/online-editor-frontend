import React from 'react';
import clsx from 'clsx';
import {ResourceType} from 'types/exchange';

interface ResourceMethodsTabsProps {
  setHttpMethod(method: string): void;
  methods: ResourceType[];
  currentHttpMethod?: string;
}

export const ResourceMethodsTabs = ({
  methods,
  setHttpMethod,
  currentHttpMethod,
}: ResourceMethodsTabsProps) => {
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
      <div className="methods-space" />
    </div>
  );
};

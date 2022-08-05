import React from 'react';
import clsx from 'clsx';

interface ResourceMethodsTabsProps {
  setHttpMethod(method: string): void;
  methods: string[];
  currentHttpMethod?: string;
}

export const HttpMethodsTabs = React.memo(
  ({methods, setHttpMethod, currentHttpMethod}: ResourceMethodsTabsProps) => (
    <div className="methods-tab d-flex">
      {methods.map((method) => (
        <button
          onClick={(e) => {
            e.preventDefault();
            setHttpMethod(method);
          }}
          key={`tab-${method}`}
          className={clsx([{active: currentHttpMethod === method}, method.toLowerCase()])}
        >
          {method}
        </button>
      ))}
      <div className="methods-space" />
    </div>
  )
);

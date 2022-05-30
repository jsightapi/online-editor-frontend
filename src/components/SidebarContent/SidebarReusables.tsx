import React, {useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import {MainRouterParams} from 'types/router';
import {CollapsibleContent} from '../CollapsibleContent/CollapsibleContentNew';
import clsx from 'clsx';
import {SidebarContext} from 'store';

const {isExport} = window as any;

interface SidebarReusablesProps {
  title: string;
  values: string[];
}

export const SidebarReusables = ({title, values}: SidebarReusablesProps) => {
  const {path} = useParams<MainRouterParams>();
  const {setCurrentUrl, currentUrl} = useContext(SidebarContext);

  return (
    <li>
      <CollapsibleContent
        title={title}
        rightContent={<div className="number">{values.length}</div>}
      >
        <ul className="collapse">
          {values.map((value) => (
            <li
              className={clsx([{active: value === (isExport ? currentUrl : path)}])}
              key={`reusable-route-${value}`}
            >
              {isExport ? (
                <span
                  onClick={() => {
                    setCurrentUrl(value);
                  }}
                >
                  {value}
                </span>
              ) : (
                <Link
                  to={{
                    pathname: '/',
                    hash: `#${value}`,
                  }}
                >
                  {value}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </li>
  );
};

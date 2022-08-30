import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {MainRouterParams} from 'types/router';
import {CollapsibleContent} from '../CollapsibleContent';
import clsx from 'clsx';
import {CurrentUrlContext} from 'store/CurrentUrlStore';

interface SidebarReusablesProps {
  title: string;
  values: string[];
}

export const SidebarReusables = ({title, values}: SidebarReusablesProps) => {
  const {path} = useParams<MainRouterParams>();
  const {setCurrentUrl, currentUrl} = useContext(CurrentUrlContext);

  return (
    <li>
      <CollapsibleContent
        title={title}
        rightContent={<div className="number">{values.length}</div>}
      >
        <ul className="collapse">
          {values.map((value) => {
            return (
              <li
                className={clsx([{active: value === (currentUrl || path)}])}
                key={`reusable-route-${value}`}
              >
                <span
                  onClick={() => {
                    setCurrentUrl(value);
                  }}
                >
                  {value}
                </span>
              </li>
            );
          })}
        </ul>
      </CollapsibleContent>
    </li>
  );
};

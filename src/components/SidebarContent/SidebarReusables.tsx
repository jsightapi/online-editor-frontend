import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {MainRouterParams} from 'types/router';
import {CollapsibleContent} from '../CollapsibleContent';
import clsx from 'clsx';
import {CurrentUrlContext} from 'store/CurrentUrlStore';
import {VirtuosoHandle} from 'react-virtuoso';

interface SidebarReusablesProps {
  title: string;
  values: string[];
}

export const SidebarReusables = ({title, values}: SidebarReusablesProps) => {
  const {path} = useParams<MainRouterParams>();
  const {setCurrentUrl, currentUrl} = useContext(CurrentUrlContext);

  const handleClick = (value: string) => {
    const virtuosoRef: React.RefObject<VirtuosoHandle> = window.hasOwnProperty('mainContent')
      ? // @ts-ignore
        window['mainContent']
      : null;

    // @ts-ignore
    const jdocPositions = window.hasOwnProperty('jdocPositions') ? window['jdocPositions'] : null;

    const index = jdocPositions.indexOf(`${value?.replace(/({|})/gi, '-')}`);

    if (~index && virtuosoRef?.current) {
      virtuosoRef.current.scrollToIndex({
        index: index + 1,
        align: 'start',
        behavior: 'auto',
      });
    }

    setCurrentUrl(value);
  };

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
                    handleClick(value);
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

import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {MainRouterParams} from 'types';
import {CurrentUrlContext} from 'store';
import clsx from 'clsx';
import {VirtuosoHandle} from 'react-virtuoso';

interface SidebarLinkProps {
  linkTo: string;
  resource: string;
}

export const SidebarLink = ({linkTo, resource}: SidebarLinkProps) => {
  const {path} = useParams<MainRouterParams>();
  const {setCurrentUrl, currentUrl} = useContext(CurrentUrlContext);

  const handleClick = (linkTo: string) => {
    const virtuosoRef: React.RefObject<VirtuosoHandle> = window.hasOwnProperty('mainContent')
      ? // @ts-ignore
        window['mainContent']
      : null;

    // @ts-ignore
    const jdocPositions = window.hasOwnProperty('jdocPositions') ? window['jdocPositions'] : null;

    const index = jdocPositions.indexOf(`${linkTo?.replace(/({|})/gi, '-')}`);

    if (~index && virtuosoRef?.current) {
      virtuosoRef.current.scrollToIndex({
        index: index + 1,
        align: 'start',
        behavior: 'auto',
      });
    }
    setCurrentUrl(linkTo);
  };

  return (
    <li className={clsx([{active: linkTo === (currentUrl || path)}])} key={resource}>
      <span
        onClick={() => {
          handleClick(linkTo);
        }}
      >
        {resource}
      </span>
    </li>
  );
};

import React, {useContext, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {MainRouterParams} from 'types';
import {CurrentUrlContext} from 'store';
import clsx from 'clsx';

interface SidebarLinkProps {
  linkTo: string;
  resource: string;
}

const {isExport} = window as any;

export const SidebarLink = ({linkTo, resource}: SidebarLinkProps) => {
  const {path} = useParams<MainRouterParams>();
  const {setCurrentUrl, currentUrl} = useContext(CurrentUrlContext);

  // const linkValue = useMemo(() => {
  //   if (linkTo === '/') {
  //     return '%2F';
  //   }
  //   return linkTo.slice(1);
  // }, [linkTo]);

  // @ts-ignore
  return (
    <li className={clsx([{active: linkTo === (currentUrl || path)}])} key={resource}>
      <span
        onClick={() => {
          setCurrentUrl(linkTo);
        }}
      >
        {resource}
      </span>
    </li>
  );
};

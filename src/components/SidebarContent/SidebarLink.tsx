import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {MainRouterParams} from 'types';
import {CurrentUrlContext} from 'store';
import clsx from 'clsx';

interface SidebarLinkProps {
  linkTo: string;
  resource: string;
}

export const SidebarLink = ({linkTo, resource}: SidebarLinkProps) => {
  const {path} = useParams<MainRouterParams>();
  const {setCurrentUrl, currentUrl} = useContext(CurrentUrlContext);

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

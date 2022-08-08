import React, {useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
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

  return (
    <li
      className={clsx([{active: linkTo.slice(1) === (isExport ? currentUrl : path)}])}
      key={resource}
    >
      {isExport ? (
        <span
          onClick={() => {
            setCurrentUrl(linkTo.slice(1));
          }}
        >
          {resource}
        </span>
      ) : (
        <Link to={linkTo}>{resource}</Link>
      )}
    </li>
  );
};

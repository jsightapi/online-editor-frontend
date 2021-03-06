import React, {useContext} from 'react';
import {SidebarContext} from 'store';
import {ResourcesType} from 'types/exchange';
import {Link, useParams} from 'react-router-dom';
import clsx from 'clsx';
import {MainRouterParams} from 'types/router';
import {CollapsibleContent} from '../CollapsibleContent';
import './SidebarGroupItems.styles.scss';

const {isExport} = window as any;

interface SidebarGroupRoutesProps {
  item: ResourcesType;
  index: number;
}

export const SidebarGroupRoutes = ({item, index}: SidebarGroupRoutesProps) => {
  const {path} = useParams<MainRouterParams>();
  const {setCurrentUrl, currentUrl} = useContext(SidebarContext);

  return (
    <li>
      <CollapsibleContent
        title={item.title}
        rightContent={<div className="number">{item.count}</div>}
      >
        <ul className="collapse">
          {item.resources.map((route, resourceKey) => {
            const linkTo = route.path.replace(/({|})/gi, '-');
            return typeof route.path === 'string' ? (
              <li
                className={clsx([{active: linkTo.substring(1) === (isExport ? currentUrl : path)}])}
                key={`${index}${resourceKey}${route}`}
              >
                {isExport ? (
                  <span
                    onClick={() => {
                      setCurrentUrl(linkTo.slice(1));
                    }}
                  >
                    {route.path}
                  </span>
                ) : (
                  <Link to={linkTo}>{route.path}</Link>
                )}
              </li>
            ) : (
              <>{/** TODO: multilevel menu **/}</>
            );
          })}
        </ul>
      </CollapsibleContent>
    </li>
  );
};

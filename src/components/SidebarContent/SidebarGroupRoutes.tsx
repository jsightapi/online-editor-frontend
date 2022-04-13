import React, {FC, useContext} from 'react';
import {ResourcesType} from 'api/getResources.model';
import {Link, useParams} from 'react-router-dom';
import clsx from 'clsx';
import {MainRouterParams} from 'types/router';
import {CollapsibleContent} from '../CollapsibleContent/CollapsibleContentNew';
import './SidebarGroupItems.styles.scss';
import {SidebarContext} from 'store';
const {isExport} = window as any;

interface SidebarGroupRoutesProps {
  item: ResourcesType;
  index: number;
}

export const SidebarGroupRoutes: FC<SidebarGroupRoutesProps> = ({item, index}) => {
  const {path} = useParams<MainRouterParams>();
  const {setCurrentUrl, currentUrl} = useContext(SidebarContext);

  return (
    <li>
      <CollapsibleContent
        title={item.title}
        rightContent={<div className="number">{item.count}</div>}
      >
        <ul className="collapse">
          {item.resources.map((route, key) => {
            const linkTo = route.path.replace(/({|})/gi, '-');
            return typeof route.path === 'string' ? (
              <li
                className={clsx([{active: linkTo.substring(1) === (isExport ? currentUrl : path)}])}
                key={`${index}${key}${route}`}
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
                  <Link
                    to={() => {
                      if (isExport) {
                        setCurrentUrl(linkTo.slice(1));
                      }
                      return linkTo;
                    }}
                  >
                    {route.path}
                  </Link>
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

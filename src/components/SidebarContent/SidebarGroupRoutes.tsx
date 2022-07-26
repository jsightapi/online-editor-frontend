import React, {useContext, useMemo} from 'react';
import {uniq} from 'lodash';
import {SidebarContext} from 'store';
import {TagType} from 'types/exchange';
import {Link, useParams} from 'react-router-dom';
import clsx from 'clsx';
import {MainRouterParams} from 'types/router';
import {CollapsibleContent} from '../CollapsibleContent';
import './SidebarGroupItems.styles.scss';
import {SidebarRoutes} from 'components/SidebarContent/SidebarRoutes';

const {isExport} = window as any;

interface SidebarGroupRoutesProps {
  tag: TagType;
}

export const SidebarGroupRoutes = ({tag}: SidebarGroupRoutesProps) => {
  const {path} = useParams<MainRouterParams>();
  const {setCurrentUrl, currentUrl} = useContext(SidebarContext);
  const routes = useMemo(
    () =>
      tag.interactionGroups.reduce<string[]>((result, interactionGroup) => {
        return [
          ...result,
          ...uniq(
            interactionGroup.interactions.map((interaction) => {
              return interaction.split(' ')[interactionGroup.protocol === 'http' ? 2 : 1];
            })
          ),
        ];
      }, []),
    [tag]
  );

  return (
    <li>
      <CollapsibleContent
        title={tag.title}
        rightContent={<div className="number">{routes.length}</div>}
      >
        <ul className="collapse">
          {routes.map((route, index) => {
            const linkTo = route.replace(/({|})/gi, '-');
            return (
              <li
                className={clsx([{active: linkTo.substring(1) === (isExport ? currentUrl : path)}])}
                key={`${index}-${route}`}
              >
                {isExport ? (
                  <span
                    onClick={() => {
                      setCurrentUrl(linkTo.slice(1));
                    }}
                  >
                    {route}
                  </span>
                ) : (
                  <Link to={linkTo}>{route}</Link>
                )}
              </li>
            );
          })}
          <SidebarRoutes tags={tag.children} />
        </ul>
      </CollapsibleContent>
    </li>
  );
};

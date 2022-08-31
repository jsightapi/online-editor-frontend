import React, {useMemo} from 'react';
import {uniq} from 'lodash';
import {TagType} from 'types/exchange';
import {CollapsibleContent} from '../CollapsibleContent';
import {SidebarRoutes} from 'components/SidebarContent/SidebarRoutes';
import './SidebarGroupItems.styles.scss';
import {SidebarLink} from 'components/SidebarContent/SidebarLink';

interface SidebarGroupRoutesProps {
  tag: TagType;
}

interface RouteGroup {
  protocol: string;
  resources: string[];
}

export const SidebarGroupRoutes = ({tag}: SidebarGroupRoutesProps) => {
  const routeGroups = useMemo(
    () =>
      tag.interactionGroups.reduce<RouteGroup[]>((result, interactionGroup) => {
        return [
          ...result,
          ...[
            {
              protocol: interactionGroup.protocol,
              resources: uniq(
                interactionGroup.interactions.map((interaction) => {
                  return interaction.split(' ')[interactionGroup.protocol === 'http' ? 2 : 1];
                })
              ),
            },
          ],
        ];
      }, []),
    [tag.interactionGroups]
  );

  const count = useMemo(
    () => routeGroups.reduce((result, routeGroup) => result + routeGroup.resources.length, 0),
    [routeGroups]
  );

  return (
    <li>
      <CollapsibleContent title={tag.title} rightContent={<div className="number">{count}</div>}>
        <ul className="collapse">
          {routeGroups.map((routeGroup) => {
            return routeGroup.resources.map((resource, index) => {
              const linkTo =
                routeGroup.protocol === 'http'
                  ? resource.replace(/({|})/gi, '-')
                  : `${tag.title.replace(/({|})/gi, '-')}-${resource}`;

              return <SidebarLink linkTo={linkTo} resource={resource} key={linkTo} />;
            });
          })}
          <SidebarRoutes tags={tag.children} />
        </ul>
      </CollapsibleContent>
    </li>
  );
};

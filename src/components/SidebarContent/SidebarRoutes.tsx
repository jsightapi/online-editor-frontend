import React from 'react';
import {TagsType, TagType} from 'types';
import {map} from 'lodash';
import {SidebarGroupRoutes} from 'components/SidebarContent/SidebarGroupRoutes';

interface SidebarRoutesProps {
  tags: TagsType | undefined;
}

export const SidebarRoutes = ({tags}: SidebarRoutesProps) => {
  if (!(tags && Object.values(tags).length)) {
    return null;
  }

  return (
    <ul>
      {map(tags, (tag: TagType) => (
        <SidebarGroupRoutes key={tag.name} tag={tag} />
      ))}
    </ul>
  );
};

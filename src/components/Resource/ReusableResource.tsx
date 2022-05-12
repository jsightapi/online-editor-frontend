import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {LinkType, SchemaJSightContentType, SchemaType} from 'types/exchange';
import {SchemaView} from '../SchemaView';
import {EnumView} from '../CodeView/EnumView';
import {CollapsibleContent} from '../CollapsibleContent';

interface ReusableResourceProps {
  name: string;
  schema?: SchemaType;
  content?: SchemaJSightContentType;
  links?: LinkType[];
  annotation?: string;
  keyBlock: string;
  className?: string;
}

export const ReusableResource = ({
  name,
  schema,
  links,
  content,
  annotation,
  keyBlock,
  className,
}: ReusableResourceProps) => {
  return (
    <div className={clsx(['resource-content', className])}>
      <h4>{name}</h4>
      {annotation && <div className="annotation">{annotation}</div>}
      {schema ? (
        <SchemaView type="code" keyBlock={keyBlock} schema={schema} hideUsedElements={true} />
      ) : (
        <EnumView keyBlock={keyBlock} content={content} />
      )}
      {links?.length && (
        <div className="links">
          <CollapsibleContent title="Used in">
            <div className="used-element-schema">
              {links.map((link, index) => {
                const resourceMethod = link.address.resourceMethod
                  ? link.address.resourceMethod.split(' ')
                  : [];
                return (
                  <div key={`link-${index}`} className="link">
                    <Link
                      to={
                        link.address.type ||
                        `${resourceMethod[1].replace(/({|})/gi, '-')}?method=${resourceMethod[0]}`
                      }
                    >
                      <i className="icon-link" />
                      {link.address.resourceMethod || link.address.type}
                    </Link>
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </div>
      )}
    </div>
  );
};

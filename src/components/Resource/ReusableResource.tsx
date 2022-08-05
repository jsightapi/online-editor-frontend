import React, {useContext, useMemo} from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {RuleType, SchemaType} from 'types/exchange';
import {SchemaView} from '../SchemaView';
import {EnumView} from '../CodeView/EnumView';
import {CollapsibleContent} from '../CollapsibleContent';
import {GlobalSettingsContext} from 'store';

interface ReusableResourceProps {
  name: string;
  schema?: SchemaType;
  content?: RuleType;
  links?: any[];
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
  const {headersBodiesTypesCode} = useContext(GlobalSettingsContext);

  const userTypesViewMode = useMemo(() => (headersBodiesTypesCode ? 'code' : 'table'), [
    headersBodiesTypesCode,
  ]);

  return (
    <div className="resource-wrapper">
      <div className={clsx(['resource-content', className])}>
        <h4 className="type">{name}</h4>
        {annotation && <div className="annotation">{annotation}</div>}
        {schema ? (
          <SchemaView
            typeBlock="header-body"
            type={userTypesViewMode}
            keyBlock={keyBlock}
            schema={schema}
            hideUsedElements={true}
          />
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
    </div>
  );
};

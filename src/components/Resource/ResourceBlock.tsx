import React, {FC} from 'react';
import {SchemaType} from 'api/getResources.model';
import {SchemaView} from '../SchemaView';

interface ResourceBlockProps {
  title: string;
  hideTitle?: boolean;
  type: string;
  typeBlock?: string;
  keyBlock: string;
  data: {
    format?: string;
    schema?: SchemaType;
    example?: string;
  };
  directiveType?: string;
}

export const ResourceBlock: FC<ResourceBlockProps> = ({
  title,
  type,
  data,
  keyBlock,
  hideTitle,
  directiveType,
  typeBlock,
}) => {
  const renderView = () => {
    const notation = data.schema?.notation;
    switch (notation) {
      case 'any':
        return <div className="content-state">Any content allowed</div>;
      case 'empty':
        return <div className="content-state">No content allowed</div>;
      default:
        return (
          <SchemaView
            {...data}
            keyBlock={keyBlock}
            typeBlock={typeBlock}
            type={type}
            directiveType={directiveType}
          />
        );
    }
  };

  return (
    <>
      {!hideTitle && <h4>{title}</h4>}
      {renderView()}
    </>
  );
};

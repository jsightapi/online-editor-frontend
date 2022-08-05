import React, {useContext, useLayoutEffect, useMemo} from 'react';
import {TableView} from '../TableView';
import {SchemaType} from 'types/exchange';
import {CodeView} from '../CodeView';
import {ExampleView} from 'components/ExampleView';
import {MainContext, GlobalSettingsContext, SchemaViewContext} from 'store';

interface SchemaViewProps {
  type: string;
  schema?: SchemaType;
  format?: string;
  hideUsedElements?: boolean;
  isCollapsible?: boolean;
  name?: string;
  example?: string;
  keyBlock: string;
  typeBlock?: string;
  block?: string;
}

export const SchemaView = ({
  type,
  schema,
  example,
  format,
  hideUsedElements,
  name,
  isCollapsible,
  keyBlock,
  block,
  typeBlock,
}: SchemaViewProps) => {
  const {typesExpand, rulesExpand} = useContext(GlobalSettingsContext);
  const {schemasView, setCollapsedRules, setViewType, setExpandedTypes, setTypeBlock} = useContext(
    MainContext
  );

  const collapsedRules = useMemo(() => {
    const schemaView = schemasView.find((item) => item.key === keyBlock);

    return schemaView && schemaView.collapsedRules !== undefined
      ? schemaView.collapsedRules
      : !rulesExpand;
  }, [schemasView, keyBlock, rulesExpand]);

  const expandedTypes = useMemo(() => {
    const schemaView = schemasView.find((item) => item.key === keyBlock);

    return schemaView && schemaView.expandedTypes !== undefined
      ? schemaView.expandedTypes
      : typesExpand;
  }, [schemasView, keyBlock, typesExpand]);

  const viewType = useMemo(() => {
    const schemaView = schemasView.find((item) => item.key === keyBlock);
    return schemaView && schemaView.viewType ? schemaView.viewType : type;
  }, [schemasView, keyBlock, type]);

  useLayoutEffect(() => {
    if (!schemasView.find((item) => item.key === keyBlock)) {
      setExpandedTypes(keyBlock, typesExpand);
      setCollapsedRules(keyBlock, !rulesExpand);
      setViewType(keyBlock, type);
      setTypeBlock(keyBlock, typeBlock);
    }
  }, [typesExpand, rulesExpand, type, keyBlock]);

  const renderView = () => {
    switch (viewType) {
      case 'table':
        return <TableView keyBlock={keyBlock} schema={schema} format={format} block={block} />;
      case 'code':
        return (
          <CodeView
            keyBlock={keyBlock}
            isCollapsible={isCollapsible}
            name={name}
            schema={schema}
            format={format}
            hideUsedElements={hideUsedElements}
          />
        );
      case 'example':
        return <ExampleView keyBlock={keyBlock} value={example || ''} />;
      default:
        return <></>;
    }
  };

  const value = useMemo(
    () => ({
      collapsedRules,
      expandedTypes,
      viewType,
    }),
    [collapsedRules, expandedTypes, viewType]
  );

  return <SchemaViewContext.Provider value={value}>{renderView()}</SchemaViewContext.Provider>;
};

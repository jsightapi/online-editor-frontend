import React, {createContext, FC, useContext, useLayoutEffect, useMemo} from 'react';
import {TableView} from '../TableView';
import {SchemaType} from 'types/exchange';
import {CodeView} from '../CodeView';
import {GlobalSettingsContext} from '../Layout';
import {ExampleView} from 'components/ExampleView';
import {MainContext} from 'store';

interface SchemaViewContextInterface {
  collapsedRules: boolean;
  expandedTypes: boolean;
  viewType: string;
}

export const SchemaViewContext = createContext({} as SchemaViewContextInterface);

interface SchemaViewProps {
  type: string;
  schema?: SchemaType;
  format?: string;
  hideUsedElements?: boolean;
  isCollapsible?: boolean;
  name?: string;
  example?: string;
  keyBlock: string;
  directiveType?: string;
  typeBlock?: string;
}

export const SchemaView: FC<SchemaViewProps> = ({
  type,
  schema,
  example,
  format,
  hideUsedElements,
  name,
  isCollapsible,
  keyBlock,
  directiveType,
  typeBlock,
}) => {
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
        return (
          <TableView
            keyBlock={keyBlock}
            schema={schema}
            format={format}
            directiveType={directiveType}
          />
        );
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

  return (
    <SchemaViewContext.Provider
      value={{
        collapsedRules,
        expandedTypes,
        viewType,
      }}
    >
      {renderView()}
    </SchemaViewContext.Provider>
  );
};

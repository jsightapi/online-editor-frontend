import React, {useContext, useMemo} from 'react';
import {SchemaJSightContentType, SchemaType, UserTypesType} from 'types/exchange';
import {map} from 'lodash';
import {ControlElements} from '../ControlElements';
import {PlainRow} from 'components/TableView/PlainRow';
import {getUserType} from 'utils/getResources';
import {JDocContext} from 'store';
import './TableView.styles.scss';

interface TableViewProps {
  keyBlock: string;
  schema?: SchemaType;
  format?: string;
  directiveType?: string;
}

interface TableRowProps {
  key: string;
  property: SchemaJSightContentType;
  level: number;
  isNestedChild: boolean;
  jsonType: any;
  parentJsonType: any;
  isLastItem: boolean;
  itemsLength: number;
}

interface TableNestedRowProps {
  parentKey: string;
  parentProperty: any;
  props: any;
  level: number;
  jsonType: any;
  isLastItem: boolean;
  isNestedChild: boolean;
}

const renderNestedRow = ({
  parentKey,
  parentProperty,
  props,
  level,
  jsonType,
  isLastItem,
  isNestedChild,
}: TableNestedRowProps): any => {
  const parentProps = {...parentProperty};
  let parentJsonType = '';
  //  remove items/properties to prevent recursion
  if (parentProps.properties) {
    parentJsonType = 'object';
    delete parentProps.properties;
  }

  if (parentProps.items) {
    parentJsonType = 'array';
    delete parentProps.items;
  }

  const parentRow = renderRow({
    key: parentKey,
    property: parentProps,
    jsonType,
    level,
    parentJsonType: jsonType,
    isNestedChild,
    isLastItem,
    itemsLength: 0,
  });
  level++;

  const childRowsMap = map(props, (property, propertyKey) => ({property, key: propertyKey}));
  const childRowsLength = childRowsMap.length;
  const childRows = childRowsMap.map(({property, key}, index) =>
    renderRow({
      property,
      key,
      isNestedChild: true,
      level,
      jsonType,
      parentJsonType,
      isLastItem: childRowsLength - 1 === index,
      itemsLength: childRowsLength,
    })
  );

  return [parentRow, ...childRows];
};

const renderRow = ({
  key,
  property,
  jsonType,
  level,
  parentJsonType,
  isNestedChild,
  isLastItem,
  itemsLength,
}: TableRowProps): any => {
  const rootIsArray = jsonType === 'array' && level === 1;
  const rootIsEmptyArray = rootIsArray && itemsLength === 0;
  const hasNestedProperties = !!(property?.properties || property?.items);
  const nestedProperties = property?.properties || property?.items;

  return hasNestedProperties ? (
    renderNestedRow({
      parentKey: key,
      parentProperty: property,
      props: nestedProperties,
      level,
      jsonType,
      isLastItem,
      isNestedChild,
    })
  ) : (
    <PlainRow
      key={key}
      keyValue={key}
      property={property}
      isNestedChild={isNestedChild}
      level={level}
      parentJsonType={parentJsonType}
      isLastItem={isLastItem}
      rootIsEmptyArray={rootIsEmptyArray}
    />
  );
};

const getSchemaProperties = (
  schema?: SchemaType,
  userTypes?: UserTypesType,
  directiveType?: string
): any => {
  if (!schema) {
    return null;
  }

  const jsonType = schema.content.jsonType;

  switch (jsonType) {
    case 'object':
      const objectProperties = schema.content.properties;
      const objectPropertiesLength = objectProperties ? Object.keys(objectProperties).length : null;
      return {properties: objectProperties, jsonType, itemsLength: objectPropertiesLength};

    case 'array':
      let arrayProperties = schema.content.items;
      let itemsLength = arrayProperties?.length;

      // if array length is 0
      if (!arrayProperties) {
        arrayProperties = [];
        itemsLength = 0;
      }

      return {properties: arrayProperties, jsonType, itemsLength};

    case 'shortcut':
      // transform shortcut to object type
      if (directiveType === 'header') {
        let properties = {};
        schema.usedUserTypes?.forEach((t) => {
          const userType = getUserType(t, userTypes);
          const userTypeProperties = userType?.schema.content.properties;
          properties = {...properties, ...userTypeProperties};
        });

        return {properties, jsonType: 'object', itemsLength: null};
      }

      return {properties: [schema.content], jsonType, itemsLength: null};
    case 'null':
    case 'boolean':
    case 'number':
    case 'string':
      const stringProperties = [schema.content];
      return {properties: stringProperties, jsonType, itemsLength: null};

    default:
      return {properties: null, jsonType: null, itemsLength: null};
  }
};

export const TableView = ({keyBlock, schema, format, directiveType}: TableViewProps) => {
  const jdocData = useContext(JDocContext);
  const userTypes = jdocData?.userTypes;
  const {properties, jsonType, itemsLength} = getSchemaProperties(schema, userTypes, directiveType);

  const isRegexNotation = schema?.notation === 'regex';
  const objectHeadVisible =
    jsonType === 'object' && (!directiveType || !['path', 'header'].includes(directiveType));

  const renderRegexNotation = isRegexNotation
    ? renderRow({
        property: ({
          type: 'string',
          rules: {regex: {scalarValue: schema?.content}},
          note: (
            <span className="detail-code-line code-font">
              <span className="name">{schema?.notation}</span>
              <span className="punctuation-char">{`:\u00A0`}</span>
              <span className="value">{schema?.content}</span>
            </span>
          ),
        } as unknown) as SchemaJSightContentType,
        key: '<root>',
        isNestedChild: false,
        level: 1,
        jsonType: jsonType,
        parentJsonType: null,
        isLastItem: false,
        itemsLength: 0,
      })
    : null;

  const renderArrayHead =
    jsonType === 'array'
      ? renderRow({
          property: {
            type: 'array',
            rules: schema?.content.rules,
            note: schema?.content.note,
          } as SchemaJSightContentType,
          key: '<root>',
          isNestedChild: false,
          level: 1,
          jsonType: jsonType,
          parentJsonType: null,
          isLastItem: false,
          itemsLength: 0,
        })
      : null;

  const renderObjectHead = objectHeadVisible
    ? renderRow({
        property: {
          type: 'object',
          rules: schema?.content.rules,
          note: schema?.content.note,
        } as SchemaJSightContentType,
        key: '<root>',
        isNestedChild: false,
        level: 1,
        jsonType: jsonType,
        parentJsonType: null,
        isLastItem: false,
        itemsLength: 0,
      })
    : null;

  const rootKey = ['shortcut', 'null', 'boolean', 'number', 'string'].includes(jsonType);

  const bodyMap = useMemo(() => {
    const getInitialLevel = () => {
      switch (true) {
        case jsonType === 'array':
          return 2;
        case jsonType === 'object':
          if (renderObjectHead) {
            return 2;
          }
          return 1;
        default:
          return 1;
      }
    };

    let data = map(properties, (property, key) => ({
      property,
      key,
      isNestedChild: false,
      level: getInitialLevel(),
    }));

    if (jsonType === 'object') {
      data = data.sort(
        (a, b) => Number(!!b.property.inheritedFrom) - Number(!!a.property.inheritedFrom)
      );
    }

    return data;
  }, [jsonType, properties, renderObjectHead]);

  const bodyMapLength = bodyMap.length;

  const body = bodyMap.map((i, index) => {
    const isLastItem = bodyMapLength - 1 === index;
    return renderRow({
      property: i.property,
      key: rootKey ? '<root>' : i.key,
      isNestedChild: i.isNestedChild,
      level: i.level,
      jsonType: jsonType,
      parentJsonType: jsonType,
      isLastItem,
      itemsLength,
    });
  });

  return (
    <table className="params-table flex-auto">
      <thead>
        <tr>
          <th>Key / Index</th>
          <th>Type</th>
          <th>Description</th>
          <th>
            <ControlElements keyBlock={keyBlock} initType={'table'} ableChangeView={true} />
          </th>
        </tr>
      </thead>
      <tbody>
        {renderObjectHead}
        {renderArrayHead}
        {renderRegexNotation}
        {body}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={4}>{format}</td>
        </tr>
      </tfoot>
    </table>
  );
};

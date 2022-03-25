import {useContext, useMemo} from 'react';
import {CodeContext, SchemaData} from 'components/CodeView/Code';

interface useSchemaDataArgs {
  numberLine: string;
  parentNumber?: string;
}

export function useSchemaData({numberLine, parentNumber}: useSchemaDataArgs) {
  const {schemaData, setSchemaData} = useContext(CodeContext);

  const currentSchema = useMemo(() => {
    const getSchema = (schemas: SchemaData[]): string | null => {
      return schemas.reduce<string | null>((result, currentData) => {
        return (
          result ||
          (currentData.numberLine === numberLine ? currentData.schemaName : null) ||
          (currentData.children.length > 0 ? getSchema(currentData.children) : null)
        );
      }, null);
    };
    return getSchema(schemaData);
  }, [schemaData, numberLine]);

  const setCurrentSchema = (value: string | null, expandTypesMode = false) => {
    if (currentSchema === value && !expandTypesMode) {
      setSchemaData((prev) => removeSchemaData(prev, numberLine));
    } else if (value) {
      setSchemaData((prev) => addSchemaData(prev, value, [], parentNumber, expandTypesMode));
    } else {
      setSchemaData((prev) => removeSchemaData(prev, numberLine));
    }
  };

  const removeSchemaData = (schemas: SchemaData[], numberLine: string): SchemaData[] => {
    return schemas.map((schema) => {
      if (schema.children.length > 0) {
        if (schema.children.find((item) => item.numberLine === numberLine)) {
          return {
            ...schema,
            children: schema.children.filter((item) => item.numberLine !== numberLine),
          };
        } else {
          return {...schema, children: removeSchemaData(schema.children, numberLine)};
        }
      }
      return schema;
    });
  };

  const unionSchemaData = (
    schemaData: SchemaData[],
    numberLine: string,
    schemaName: string,
    expandTypesMode = false
  ) => {
    if (schemaData.find((item) => item.numberLine === numberLine)) {
      return schemaData.map((item) => {
        if (item.numberLine === numberLine) {
          return {
            ...item,
            schemaName,
            children: expandTypesMode ? item.children : [],
          };
        }
        return item;
      });
    } else {
      return [
        ...schemaData,
        {
          numberLine,
          schemaName,
          detailAnnotations: [],
          children: [],
        },
      ];
    }
  };

  const addSchemaData = (
    currentData: SchemaData[],
    schemaName: string,
    schemas: string[],
    parentNumber?: string,
    expandTypesMode = false
  ): SchemaData[] => {
    return currentData.map((item) => {
      if (parentNumber === item.numberLine) {
        return {
          ...item,
          children: unionSchemaData(item.children, numberLine, schemaName, expandTypesMode),
        };
      } else if (item.children.length > 0) {
        return {
          ...item,
          children: schemas.includes(schemaName)
            ? []
            : addSchemaData(
                item.children,
                schemaName,
                item.schemaName ? [...schemas, item.schemaName] : schemas,
                parentNumber
              ),
        };
      }
      return item;
    });
  };

  return {currentSchema, setCurrentSchema};
}

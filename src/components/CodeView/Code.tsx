import React, {
  createContext,
  MutableRefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {RuleType, SchemaType} from 'types/exchange';
import {LinesCollection} from './LinesCollection';
import {createPortal} from 'react-dom';
import {RightRules} from 'components/CodeView/RightRules';
import {RegexView} from 'components/CodeView/RegexView';
import {MainContext, SidebarContext, SchemaViewContext} from 'store';
import {emptySchemaData} from 'utils/emptySchemaData';

export interface AnnotationType {
  name: string; // name of the related property (shown in the card)
  typeName: string; // property type (shown in the card)
  rules: RuleType[]; // rules list (shown in the card)
  note?: string; // comment (shown in the card if present)
  spanRef: MutableRefObject<HTMLSpanElement | null>; // reference to the line related to the card
  numberLine: string; // line number (to identify card on the same level)
  schemaName?: string; // schema, the code relates to (undefined for root)
}

export interface LinePosition {
  numberLine: string; // unique line number (1-2-3)
}

// one line can contain multiple schemas
export interface SchemaLinePosition extends LinePosition {
  schemaName: string;
}

export interface SchemaData {
  schemaName?: string;
  numberLine?: string;
  detailAnnotations: AnnotationType[];
  children: SchemaData[];
}

interface CodeContextInterface {
  schemaData: SchemaData[];
  updateAnnotations(value: AnnotationType, additional: boolean, parentNumber?: string): void;
  hiddenInheritedSchemas: SchemaLinePosition[]; // hidden inherited schemes (may be multiple)
  hideInheritedSchema(value: SchemaLinePosition): void;
  showInheritedSchema(value: SchemaLinePosition): void;
  hoveredSchema: SchemaLinePosition | null; // line of code, containing inherited schema that's been hovered
  setHoveredSchema(value: SchemaLinePosition | null): void;
  keyBlock: string;
}

export const CodeContext = createContext({} as CodeContextInterface);

interface CodeProps {
  keyBlock: string;
  schema: SchemaType; // schema for current code
  tab: number;
  name?: string;
  codeViewRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const Code = ({schema, tab, codeViewRef, keyBlock}: CodeProps) => {
  const [hiddenInheritedSchemas, setHiddenInheritedSchemas] = useState<SchemaLinePosition[]>([]);
  const [hoveredSchema, setHoveredSchema] = useState<SchemaLinePosition | null>(null);
  const [height, setHeight] = useState<number>(0);
  const {selectedLine, setSchemasData, schemasData} = useContext(MainContext);
  const {expandedTypes} = useContext(SchemaViewContext);
  const {
    currentDocSidebar,
    setCurrentDocSidebar,
    currentHtmlDocPanel,
    setCurrentHtmlDocPanel,
  } = useContext(SidebarContext);
  const [isFirst, setIsFirst] = useState<boolean>(true);

  const schemaData = useMemo(() => {
    return schemasData.hasOwnProperty(keyBlock) ? schemasData[keyBlock] : [emptySchemaData];
  }, [keyBlock, schemasData]);

  useLayoutEffect(() => {
    if (!schemasData[keyBlock]) {
      setSchemasData((prev) => {
        return {
          ...prev,
          [keyBlock]: [emptySchemaData],
        };
      });
    }
  }, [keyBlock, schema.content]);

  useEffect(() => {
    if (!expandedTypes) {
      setSchemasData((prev) => {
        return {
          ...prev,
          [keyBlock]: isFirst
            ? prev[keyBlock]
            : [
                {
                  ...prev[keyBlock][0],
                  children: [],
                },
              ],
        };
      });

      setIsFirst(false);
    }
  }, [expandedTypes, keyBlock]);

  const annotations = useMemo(() => {
    const getAnnotations = (schemaData: SchemaData[]) => {
      let annotations: AnnotationType[] = [];
      schemaData.map((item) => {
        annotations = [...annotations, ...item.detailAnnotations];
        if (item.children.length > 0) {
          annotations = [...annotations, ...getAnnotations(item.children)];
        }
      });

      return annotations;
    };

    return getAnnotations(schemaData);
  }, [schemaData]);

  const hideInheritedSchema = (value: SchemaLinePosition) => {
    setHiddenInheritedSchemas((prev) => prev.concat([value]));
  };

  const showInheritedSchema = (value: SchemaLinePosition) => {
    setHiddenInheritedSchemas((prev) =>
      prev.filter(
        (item) => !(item.numberLine === value.numberLine && item.schemaName === value.schemaName)
      )
    );
  };

  const updateExistAnnotation = (annotations: AnnotationType[], value: AnnotationType) => {
    if (annotations.find((item) => item.numberLine === value.numberLine)) {
      return annotations.map((item) => {
        if (item.numberLine === value.numberLine) {
          return value;
        }
        return item;
      });
    } else {
      return [...annotations, value];
    }
  };

  const updateAnnotations = (value: AnnotationType, additional: boolean, numberLine?: string) => {
    const addAnnotation = (
      currentData: SchemaData[],
      value: AnnotationType,
      parentNumber?: string
    ): SchemaData[] => {
      return currentData.map((item) => {
        if (parentNumber === item.numberLine) {
          return {
            ...item,
            detailAnnotations: updateExistAnnotation(item.detailAnnotations, value),
          };
        } else if (item.children.length > 0) {
          return {
            ...item,
            children: addAnnotation(item.children, value, parentNumber),
          };
        } else {
          return item;
        }
      });
    };

    const removeAnnotation = (currentData: SchemaData[], numberLine: string): SchemaData[] => {
      return currentData.map((item) => {
        return {
          ...item,
          detailAnnotations: item.detailAnnotations.filter(
            (annotation) => annotation.numberLine !== numberLine
          ),
        };
      });
    };

    additional
      ? setSchemasData((prev) => {
          return {...prev, [keyBlock]: addAnnotation(prev[keyBlock], value, numberLine)};
        })
      : setSchemasData((prev) => {
          return {...prev, [keyBlock]: removeAnnotation(prev[keyBlock], value.numberLine)};
        });
  };

  // block height is changed when schema is collapsed/expanded
  useEffect(() => {
    setHeight((codeViewRef.current?.getBoundingClientRect().height || 0) + 65);
  }, [schemaData, hiddenInheritedSchemas, codeViewRef]);

  // when active live with rules is changed
  useEffect(() => {
    if (selectedLine && currentHtmlDocPanel !== 'content') {
      setCurrentHtmlDocPanel('rules');
    } else {
      setHeight((codeViewRef.current?.getBoundingClientRect().height || 0) + 65);
    }
  }, [selectedLine]);

  const updateHeight = (detailActiveElement: HTMLSpanElement, codeLineDocumentOffset: number) => {
    const detailActiveElementHeight = detailActiveElement ? detailActiveElement.offsetHeight : 0;

    const codeTopBlockOffset =
      codeLineDocumentOffset -
      (codeViewRef && codeViewRef.current ? codeViewRef.current.getBoundingClientRect().top : 0);

    const detailWrapperHeight = detailActiveElementHeight + codeTopBlockOffset;
    if (
      detailWrapperHeight >
      (codeViewRef && codeViewRef.current ? codeViewRef.current.offsetHeight : 0)
    ) {
      setHeight(detailWrapperHeight + 65);
    }
  };

  if (schema.notation === 'jsight' && typeof schema.content === 'object') {
    const linesCollection = LinesCollection({
      content: schema.content,
      tab,
      isLastLine: true,
      level: 0,
      schemasNames: [],
    });

    return (
      <CodeContext.Provider
        value={{
          schemaData,
          hiddenInheritedSchemas,
          hoveredSchema,
          keyBlock,
          hideInheritedSchema,
          showInheritedSchema,
          setHoveredSchema,
          updateAnnotations,
        }}
      >
        {linesCollection}
        {codeViewRef && codeViewRef.current
          ? createPortal(
              <RightRules
                keyBlock={keyBlock}
                annotations={annotations}
                codeViewRef={codeViewRef}
                height={height}
                linesCollection={linesCollection}
                updateHeight={updateHeight}
                isFirst={isFirst}
              />,
              codeViewRef.current
            )
          : null}
      </CodeContext.Provider>
    );
  } else if (schema.notation === 'regex') {
    return <RegexView tab={0} content={(schema.content as unknown) as string} />;
  } else {
    return null;
  }
};

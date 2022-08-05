import {useContext, useMemo} from 'react';
import {CodeContext} from 'components/CodeView/Code';
import {useShowDetailInfo} from '../hooks/useShowDetailInfo';
import {MainContext, SidebarContext, SchemaViewContext} from 'store';
import {RuleType} from 'types';

interface SelectionLineArgs {
  numberLine: string;
  parentInheritedNumber?: string;
  schemaName?: string;
  rules?: RuleType[];
  notes?: string;
}

interface SelectionLineParams {
  isSelected: boolean;
  isHovered: boolean;
  isHidden: boolean;
  handleLineClick: () => void;
}

export function useSelectionLine({
  numberLine,
  parentInheritedNumber,
  schemaName,
  rules,
  notes,
}: SelectionLineArgs): SelectionLineParams {
  const {setSelectedLine, selectedLine} = useContext(MainContext);
  const {collapsedRules} = useContext(SchemaViewContext);
  const {hoveredSchema, hiddenInheritedSchemas, keyBlock} = useContext(CodeContext);
  const {setCurrentDocSidebar} = useContext(SidebarContext);

  const isShowDetailInfo = useShowDetailInfo(rules, notes);

  const isSelected = useMemo(() => selectedLine?.numberLine === numberLine, [
    numberLine,
    selectedLine,
  ]);

  const isHovered = useMemo(
    () =>
      hoveredSchema?.schemaName === schemaName &&
      hoveredSchema?.numberLine === parentInheritedNumber,
    [hoveredSchema, parentInheritedNumber, schemaName]
  );

  const isHidden = useMemo(() => {
    return !!hiddenInheritedSchemas.find(
      (item) => item.schemaName === schemaName && item.numberLine === parentInheritedNumber
    );
  }, [hiddenInheritedSchemas, parentInheritedNumber, schemaName]);

  const handleLineClick = () => {
    // mark line as active, if it has a corresponding card,
    if (isShowDetailInfo && collapsedRules) {
      setSelectedLine((prev) => {
        if (prev?.numberLine === numberLine && prev?.keyBlock === keyBlock) {
          setCurrentDocSidebar(null);
          return null;
        }

        setCurrentDocSidebar('rules');
        return {
          numberLine,
          keyBlock,
        };
      });
    } else {
      setSelectedLine(null);
      setCurrentDocSidebar(null);
    }
  };

  return {isSelected, isHovered, isHidden, handleLineClick};
}

import React, {useContext, useMemo} from 'react';
import {getUserEnum, getUserType} from 'utils/getResources';
import {LinesCollection} from '../LinesCollection';
import {JsightSchemaElement, UserRuleType, UserTypeType} from 'types/exchange';
import {RegexView} from 'components/CodeView/RegexView';
import {JDocContext} from 'store';

interface ShortcutLinesProps {
  schemasNames: string[];
  numberLine: string;
  level: number;
  tab: number;
  disableOpenBracket: boolean;
}

// render code for shortcuts; passing type, parent line and indentation
export const ShortcutLines = ({
  schemasNames,
  numberLine,
  level,
  tab,
  disableOpenBracket,
}: ShortcutLinesProps) => {
  const {jdocExchange: jdocData} = useContext(JDocContext);

  const userType = useMemo(() => {
    const schemaName = schemasNames.slice(-1).pop();
    return (
      getUserType(schemaName, jdocData?.userTypes) || getUserEnum(schemaName, jdocData?.userEnums)
    );
  }, [schemasNames, jdocData]);

  if (!userType) {
    return null;
  }

  if ((userType as UserTypeType).schema.notation === 'regex') {
    return (
      <span className="shortcut-lines">
        <RegexView
          tab={tab}
          content={((userType as UserTypeType).schema.content as unknown) as string}
        />
      </span>
    );
  }

  return (
    <span className="shortcut-lines">
      {LinesCollection({
        level,
        tab,
        content: ((userType as UserTypeType).schema.content ||
          (userType as UserRuleType).value) as JsightSchemaElement,
        isLastLine: true,
        schemasNames,
        parentNumber: numberLine,
        disableOpenBracket,
      })}
    </span>
  );
};

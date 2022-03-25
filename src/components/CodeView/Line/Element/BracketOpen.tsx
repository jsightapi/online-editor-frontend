import React, {FC, useMemo, useRef, useState} from 'react';
import {PropName} from './PropName';
import clsx from 'clsx';
import {get} from 'lodash';
import {RulesType} from 'api/getResources.model';
import {bracePairs} from 'utils/bracePairs';
import {useSelectionLine} from '../../hooks/useSelectionLine';
import {ObjectContext} from '../../store/ObjectContext';

interface RulesRenderArgs {
  propName?: string;
  rules?: RulesType;
  tab: number;
  numberLine: string;
}

interface BracketOpenProps {
  tab: number;
  bracket: string;
  propName?: string;
  rules?: RulesType;
  rulesRender?: (args: RulesRenderArgs) => JSX.Element;
  numberLine: string;
  parentNumber?: string;
  isEmpty: boolean;
  isLastLine: boolean;
  inheritedSchema?: string;
  isKeyShortcut?: boolean;
  optional: boolean;
  notes?: string;
}

interface BracketOpenLineComponentProps {
  classes: string;
  tab: number;
  handleLineClick: React.MouseEventHandler<HTMLSpanElement>;
  value: string;
  propName?: string;
  rulesElement?: JSX.Element;
  requiredElement: JSX.Element;
  isKeyShortcut?: boolean;
}

const BracketOpenLineComponent: FC<BracketOpenLineComponentProps> = ({
  classes,
  tab,
  handleLineClick,
  value,
  propName,
  rulesElement,
  requiredElement,
  isKeyShortcut,
}) => (
  <span onClick={handleLineClick} className={classes}>
    <span className="number" />
    {requiredElement}
    <span>{' '.repeat(tab)}</span>
    {propName && <PropName name={propName} isKeyShortcut={isKeyShortcut} />}
    <span className="punctuation-char">{value}</span>
    {rulesElement}
  </span>
);

export const BracketOpen: FC<BracketOpenProps> = ({
  tab,
  propName,
  bracket,
  rulesRender,
  numberLine,
  rules,
  isEmpty,
  isLastLine,
  isKeyShortcut,
  optional,
  notes,
}) => {
  const objectSpanRef = useRef<HTMLSpanElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const {isSelected, handleLineClick} = useSelectionLine({numberLine, rules, notes});

  const isShortcut = useMemo(
    () => rules && (rules.hasOwnProperty('type') || rules.hasOwnProperty('or')),
    [rules]
  );

  const classes = useMemo(
    () =>
      clsx({
        'code-line': true,
        shortcut: isShortcut,
        expanded,
        selected: isSelected,
      }),
    [expanded, isSelected, isShortcut]
  );

  const closeBracket = useMemo(() => get(bracePairs, bracket, ''), [bracket]);

  const renderBrackets = (bracket: string) => {
    let result = bracket;
    if (isEmpty) {
      if (!expanded) {
        result += closeBracket;
      }
      if (!isLastLine) {
        result += ',';
      }
    }

    return result;
  };

  const handleBracketOpenLineClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    handleLineClick();
  };

  const bracketOpenLineComponentProps = {
    classes,
    tab,
    handleLineClick: handleBracketOpenLineClick,
    isKeyShortcut,
    requiredElement: (
      <span className={clsx(['required', {not: optional}])}>
        <i className="icon-star" />
      </span>
    ),
    value: renderBrackets(bracket),
    propName,
    rulesElement: rulesRender && rulesRender({tab, numberLine, rules, propName}),
  };

  return isShortcut ? (
    <ObjectContext.Provider value={{expanded, setExpanded, objectSpanRef}}>
      <span ref={objectSpanRef}>
        <BracketOpenLineComponent {...bracketOpenLineComponentProps} />
      </span>
    </ObjectContext.Provider>
  ) : (
    <BracketOpenLineComponent {...bracketOpenLineComponentProps} />
  );
};

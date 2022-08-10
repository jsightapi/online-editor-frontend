import React from 'react';
import {RuleValueType} from './RuleValueType';
import {RuleValueAllOf} from './RuleValueAllOf';
import clsx from 'clsx';
import {wrapInQuotes} from 'utils/wrapInQuotes';

export interface RuleValueProps {
  value: string;
  schemaName?: string;
  className: string;
  numberLine: string;
  tab: number;
  parentNumber?: string;
  level: number;
  ruleProp: string;
  type?: string;
}

export const RuleValue = (props: RuleValueProps) => {
  if (props.ruleProp === 'type') {
    return <RuleValueType {...props} />;
  } else if (props.ruleProp === 'allOf') {
    return <RuleValueAllOf {...props} />;
  }

  return (
    <span className={clsx(props.className, `rule-value-${props.type}`)}>
      {wrapInQuotes(props.value, !['regex', 'string'].includes(props.type || '')) as string}
    </span>
  );
};

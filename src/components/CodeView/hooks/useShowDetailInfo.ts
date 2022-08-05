import {useMemo} from 'react';
import {RuleType} from 'types/exchange';
import {countWords} from '../utils/countWords';

export function useShowDetailInfo(rules?: RuleType[], notes?: string) {
  return useMemo(() => {
    if (rules) {
      if (rules.length > 1 || (rules.length && rules[0].tokenType === 'array')) {
        return true;
      }
    }

    return !!(notes && countWords(notes) > 3);
  }, [rules, notes]);
}

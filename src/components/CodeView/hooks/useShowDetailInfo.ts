import {useMemo} from 'react';
import {RuleType} from 'types/exchange';
import {countWords} from '../utils/countWords';

export function useShowDetailInfo(rules?: any[], notes?: string) {
  return useMemo(() => {
    if (rules) {
      const rulesKeys = Object.keys(rules);
      // @ts-ignore
      if (rulesKeys.length > 1 || rules[rulesKeys[0]].jsonType === 'array') {
        return true;
      }
    }

    return !!(notes && countWords(notes) > 3);
  }, [rules, notes]);
}

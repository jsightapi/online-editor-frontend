import {useMemo} from 'react';
import {RulesType} from 'api/getResources.model';
import {countWords} from '../utils/countWords';

export function useShowDetailInfo(rules?: RulesType, notes?: string) {
  return useMemo(() => {
    if (rules) {
      const rulesKeys = Object.keys(rules);
      if (rulesKeys.length > 1 || rules[rulesKeys[0]].jsonType === 'array') {
        return true;
      }
    }

    return !!(notes && countWords(notes) > 3);
  }, [rules, notes]);
}

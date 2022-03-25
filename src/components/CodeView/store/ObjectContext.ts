import React, {createContext, MutableRefObject} from 'react';

interface ObjectContextInterface {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  objectSpanRef?: MutableRefObject<HTMLSpanElement | null>;
}

export const ObjectContext = createContext({} as ObjectContextInterface);

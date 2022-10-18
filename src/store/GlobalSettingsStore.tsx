import {createContext, FC, useMemo, useState} from 'react';
import {ProviderInterface} from 'types/store';

export interface GlobalSettingsContextInterface {
  isOpen: boolean;
  tabs: boolean;
  headersBodiesTypesCode: boolean;
  pathQueriesCode: boolean;
  typesExpand: boolean;
  rulesExpand: boolean;
  setTabs(value: boolean): void;
  setHeadersBodiesTypesCode(value: boolean): void;
  setPathQueriesCode(value: boolean): void;
  setTypesExpand(value: boolean): void;
  setRulesExpand(value: boolean): void;
  setIsOpen(value: boolean): void;
}

export const GlobalSettingsContext = createContext({} as GlobalSettingsContextInterface);

export const GlobalSettingsProvider: FC<ProviderInterface> = ({children}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tabs, setTabs] = useState<boolean>(true);
  const [headersBodiesTypesCode, setHeadersBodiesTypesCode] = useState<boolean>(true);
  const [pathQueriesCode, setPathQueriesCode] = useState<boolean>(false);
  const [typesExpand, setTypesExpand] = useState<boolean>(false);
  const [rulesExpand, setRulesExpand] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      isOpen,
      tabs,
      headersBodiesTypesCode,
      pathQueriesCode,
      typesExpand,
      rulesExpand,
      setIsOpen,
      setTabs,
      setHeadersBodiesTypesCode,
      setPathQueriesCode,
      setTypesExpand,
      setRulesExpand,
    }),
    [isOpen, tabs, headersBodiesTypesCode, pathQueriesCode, typesExpand, rulesExpand]
  );

  return <GlobalSettingsContext.Provider value={value}>{children}</GlobalSettingsContext.Provider>;
};

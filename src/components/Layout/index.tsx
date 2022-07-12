import React, {createContext, useState} from 'react';
import {SidebarContent} from '../SidebarContent';
import {Settings} from '../Settings';

interface GlobalSettingsContextInterface {
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

interface LayoutProps {
  isShowSidebar: boolean;
  isShowSettings: boolean;
  side: 'left' | 'right';
  children?: React.ReactNode;
}

export const Layout = ({children, isShowSidebar, isShowSettings, side}: LayoutProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tabs, setTabs] = useState<boolean>(true);
  const [headersBodiesTypesCode, setHeadersBodiesTypesCode] = useState<boolean>(true);
  const [pathQueriesCode, setPathQueriesCode] = useState<boolean>(false);
  const [typesExpand, setTypesExpand] = useState<boolean>(false);
  const [rulesExpand, setRulesExpand] = useState<boolean>(false);

  return (
    <GlobalSettingsContext.Provider
      value={{
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
      }}
    >
      <>
        {isShowSettings && <Settings />}
        <SidebarContent side={side} isShowSettings={isShowSettings} isShow={isShowSidebar} />
      </>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

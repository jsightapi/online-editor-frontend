import React, {useContext} from 'react';
import {SidebarContent} from '../SidebarContent';
import {GlobalSettingsProvider, SidebarContext} from 'store';
import {Settings} from '../Settings';

interface LayoutProps {
  children: React.ReactNode;
  isEditor: boolean;
}

export const Layout = ({children, isEditor}: LayoutProps) => {
  const {currentDocSidebar, currentHtmlDocPanel} = useContext(SidebarContext);
  const isShowSidebar = isEditor
    ? currentHtmlDocPanel === 'content' && currentDocSidebar === 'htmldoc'
    : true;
  const side = isEditor ? 'right' : 'left';

  return (
    <GlobalSettingsProvider>
      <>
        {!isEditor && <Settings />}
        <SidebarContent side={side} isShowSettings={!isEditor} isShow={isShowSidebar} />
      </>
      {children}
    </GlobalSettingsProvider>
  );
};

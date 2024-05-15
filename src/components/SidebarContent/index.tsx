import React, {useContext, useMemo} from 'react';
import clsx from 'clsx';
import logo from '../../assets/images/icon-jsight.png';
import logoWhite from '../../assets/images/icon_jsight_white.png';
import {JDocContext, SidebarContext, GlobalSettingsContext} from 'store';

import './SidebarContent.styles.scss';
import {SidebarReusables} from 'components/SidebarContent/SidebarReusables';
import {SidebarRoutes} from 'components/SidebarContent/SidebarRoutes';

const {isExport} = window as any;

interface SidebarContentProps {
  theme?: 'light' | 'dark';
  side?: 'left' | 'right';
  isShowSettings: boolean;
  isShow: boolean;
}

export const SidebarContent = ({side, isShowSettings, isShow}: SidebarContentProps) => {
  const {setIsOpen, isOpen} = useContext(GlobalSettingsContext);
  const {setCurrentHtmlDocPanel} = useContext(SidebarContext);
  const {jdocExchange: jdocData} = useContext(JDocContext);

  const tags = useMemo(() => jdocData?.tags || {}, [jdocData]);

  const toggleShowSettings = () => {
    setIsOpen(!isOpen);
  };

  const sidebarClasses = useMemo(
    () =>
      clsx({
        'sidebar-content': true,
        'side-left': side === 'left',
        'side-right': side === 'right',
      }),
    [side]
  );

  const footerClasses = useMemo(() => clsx(['sidebar-footer', {'is-open': isOpen}]), [isOpen]);

  return (
    <div className={clsx('sidebar-wrapper', {'is-show': isShow})}>
      <div className={sidebarClasses}>
        <div className="sidebar-header d-flex">
          <div className="flex-auto">
            <i className="icon-menu" /> <h2>Contents</h2>
          </div>
          {!(side === 'left' || isExport) && (
            <button onClick={() => setCurrentHtmlDocPanel('none')}>
              <i className="icon-close" />
            </button>
          )}
        </div>
        <div className="sidebar-items">
          <h3>Resources</h3>
          <SidebarRoutes tags={tags} />
        </div>
        {(jdocData?.userTypes || jdocData?.userEnums) && (
          <div className="sidebar-items">
            <h3>Reusables</h3>
            <ul>
              {jdocData?.userTypes && (
                <SidebarReusables title="Types" values={Object.keys(jdocData.userTypes)} />
              )}
              {jdocData?.userEnums && (
                <SidebarReusables title="Enums" values={Object.keys(jdocData.userEnums)} />
              )}
            </ul>
          </div>
        )}
      </div>
      {isShowSettings && (
        <div className={footerClasses}>
          <button onClick={toggleShowSettings} className="btn-settings d-flex">
            <i className="icon-settings" />
            Settings
          </button>
          <a href="https://jsight.io" className="copyright d-flex">
            <img src={isOpen ? logoWhite : logo} alt="JSight logo" />
            Powered by <span>JSight.io</span>
          </a>
        </div>
      )}
    </div>
  );
};

SidebarContent.defaultProps = {
  theme: 'light',
  side: 'left',
};

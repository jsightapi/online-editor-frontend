import React, {useContext, useMemo} from 'react';
import {getTreeResources} from 'utils/getResources';
import {SidebarGroupRoutes} from './SidebarGroupRoutes';
import {SidebarReusables} from './SidebarReusables';
import logo from '../../assets/images/icon-jsight.png';
import logoWhite from '../../assets/images/icon_jsight_white.png';
import clsx from 'clsx';
import {JDocContext, SidebarContext} from 'store';
import {GlobalSettingsContext} from 'components/Layout';
import './SidebarContent.styles.scss';

const {isExport} = window as any;

interface SidebarContentProps {
  theme?: 'light' | 'dark';
  side?: 'left' | 'right';
  isShowSettings: boolean;
  isShow: boolean;
}

export const SidebarContent = ({side, isShowSettings, isShow}: SidebarContentProps) => {
  const {setIsOpen, isOpen} = useContext(GlobalSettingsContext);
  const jdocData = useContext(JDocContext);
  const {setCurrentDocSidebar} = useContext(SidebarContext);

  const resources = useMemo(
    () => (jdocData?.tags ? getTreeResources(jdocData.tags, jdocData?.resourceMethods) : []),
    [jdocData]
  );

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
          {/*<a href="#">*/}
          {/*  <i className="icon-arrow-left" />*/}
          {/*</a>*/}
          {!(side === 'left' || isExport) && (
            <button onClick={() => setCurrentDocSidebar(null)}>
              <i className="icon-close" />
            </button>
          )}
        </div>
        <div className="sidebar-items">
          <h3>Resources</h3>
          <ul>
            {resources.map((item, index) => (
              <SidebarGroupRoutes key={`${index}-${item.title}`} item={item} index={index} />
            ))}
          </ul>
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

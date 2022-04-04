import React, {FC, useContext, useMemo} from 'react';
import {getTreeResources} from 'api/getResources';
import {SidebarGroupRoutes} from './SidebarGroupRoutes';
import {SidebarReusables} from './SidebarReusables';
// import {GlobalSettingsContext} from '../Layout';
import logo from '../../assets/images/icon-jsight.png';
import clsx from 'clsx';
import './SidebarContent.styles.scss';
import {JDocContext, SidebarContext} from 'store';
const {isExport} = window as any;

interface SidebarContentProps {
  theme?: 'light' | 'dark';
  side?: 'left' | 'right';
  isShowSettings: boolean;
  isShow: boolean;
}

export const SidebarContent: FC<SidebarContentProps> = ({side, isShowSettings, isShow}) => {
  // const {setIsOpen, isOpen} = useContext(GlobalSettingsContext);
  const jdocData = useContext(JDocContext);
  const {setCurrentDocSidebar} = useContext(SidebarContext);

  const resources = useMemo(
    () => (jdocData?.tags ? getTreeResources(jdocData.tags, jdocData?.resourceMethods) : []),
    [jdocData]
  );

  // const toggleShowSettings = () => {
  //   setIsOpen(!isOpen);
  // };

  const sidebarClasses = useMemo(
    () =>
      clsx({
        'sidebar-content': true,
        'side-left': side === 'left',
        'side-right': side === 'right',
      }),
    [side]
  );

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
        <div className="sidebar-footer">
          {/*<button onClick={toggleShowSettings} className="btn-settings d-flex">*/}
          {/*  <i className="icon-settings" />*/}
          {/*  Settings*/}
          {/*</button>*/}
          <a href="https://jsight.io" className="copyright d-flex">
            <img src={logo} alt="JSight logo" />
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

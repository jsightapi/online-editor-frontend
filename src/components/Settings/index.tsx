import React, {useContext} from 'react';
import {GlobalSettingsContext} from '../Layout';
import {SettingsItem} from './SettingsItem';
import './Settings.styles.scss';

export const Settings = () => {
  const {
    isOpen,
    setIsOpen,
    tabs,
    setTabs,
    pathQueriesCode,
    setPathQueriesCode,
    headersBodiesTypesCode,
    setHeadersBodiesTypesCode,
    rulesExpand,
    setRulesExpand,
    typesExpand,
    setTypesExpand,
  } = useContext(GlobalSettingsContext);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="backdrop-modal" />
      <div className="modal">
        <div className="modal-inner">
          <div className="settings-wrapper">
            <div className="settings">
              <div className="header d-flex">
                <div className="title">Settings</div>
                <div className="close" onClick={() => setIsOpen(false)}>
                  <i className="icon-close" />
                </div>
              </div>
              <SettingsItem
                title={'HTTP methods'}
                firstTab={['tabs', 'Tabs']}
                secondTab={['plain-list', 'Plain']}
                onClickFirst={() => setTabs(true)}
                onClickSecond={() => setTabs(false)}
                value={tabs}
              />
              <SettingsItem
                title={'Headers & bodies & types'}
                firstTab={['list', 'Code view']}
                secondTab={['table', 'Table view']}
                onClickFirst={() => setHeadersBodiesTypesCode(true)}
                onClickSecond={() => setHeadersBodiesTypesCode(false)}
                value={headersBodiesTypesCode}
              />
              <SettingsItem
                title={'Path & queries'}
                firstTab={['table', 'Table view']}
                secondTab={['list', 'Code view']}
                onClickFirst={() => setPathQueriesCode(false)}
                onClickSecond={() => setPathQueriesCode(true)}
                value={!pathQueriesCode}
              />
              <SettingsItem
                title={'Types'}
                firstTab={['email', 'Expand']}
                secondTab={['strikethrough-email', 'Collapse']}
                onClickFirst={() => setTypesExpand(true)}
                onClickSecond={() => setTypesExpand(false)}
                value={typesExpand}
              />
              <SettingsItem
                title={'Rules'}
                firstTab={['braces-dots', 'Expand']}
                secondTab={['braces-number', 'Collapse']}
                onClickFirst={() => setRulesExpand(true)}
                onClickSecond={() => setRulesExpand(false)}
                value={rulesExpand}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import React, {useContext, FC, useMemo, useState} from 'react';
import {Dropdown} from '../Dropdown';
import {DropdownToggle} from '../Dropdown/DropdownToggle';
import {DropdownMenu} from '../Dropdown/DropdownMenu';
import clsx from 'clsx';
import {ButtonDisabled} from 'components/ControlElements/ButtonDisabled';
import {GlobalSettingsContext} from 'components/Layout';
import './ControlElements.styles.scss';
import {MainContext} from 'store';

interface ControlElementsProps {
  ableChangeView?: boolean;
  ableExpandTypes?: boolean;
  ableExpandRules?: boolean;
  keyBlock: string;
  initType: string;
}

export const ControlElements: FC<ControlElementsProps> = ({
  ableChangeView,
  ableExpandTypes,
  ableExpandRules,
  keyBlock,
  initType,
}) => {
  const {schemasView, setCollapsedRules, setExpandedTypes, setViewType} = useContext(MainContext);
  const {typesExpand, rulesExpand} = useContext(GlobalSettingsContext);
  const [typesDdVisible, setTypesDdVisible] = useState(false);
  const [rulesDdVisible, setRulesDdVisible] = useState(false);

  const viewType = useMemo(() => {
    const schemaView = schemasView.find((item) => item.key === keyBlock);
    return schemaView ? schemaView.viewType : initType;
  }, [schemasView, keyBlock, initType]);

  const collapsedRules = useMemo(() => {
    const schemaView = schemasView.find((item) => item.key === keyBlock);
    return schemaView ? schemaView.collapsedRules : !rulesExpand;
  }, [schemasView, keyBlock, rulesExpand]);

  const expandedTypes = useMemo(() => {
    const schemaView = schemasView.find((item) => item.key === keyBlock);
    return schemaView ? schemaView.expandedTypes : typesExpand;
  }, [schemasView, keyBlock, typesExpand]);

  const iconViewMode = useMemo(() => {
    switch (viewType) {
      case 'code':
        return 'icon-code-comment';
      case 'table':
        return 'icon-table';
      case 'example':
      default:
        return 'icon-list';
    }
  }, [viewType]);

  const iconRules = useMemo(() => (collapsedRules ? 'icon-braces-number' : 'icon-braces-dots'), [
    collapsedRules,
  ]);

  const iconTypes = useMemo(() => (expandedTypes ? 'icon-email' : 'icon-strikethrough-email'), [
    expandedTypes,
  ]);

  const isHideCopy = false;
  const isExampleView = false;

  return (
    <div className="d-flex control-elements">
      {isHideCopy && (
        <Dropdown>
          <DropdownToggle>
            <i className="icon-notebook" />
            <i className="icon-arrow-down" />
          </DropdownToggle>
          <DropdownMenu>
            <div className="item">
              <i className="icon-notebook" /> Copy example
            </div>
            <div className="item">
              <i className="icon-notebook-braces" /> Copy schema
            </div>
            <div className="item">
              <i className="icon-notebook-email" /> Copy expanded schema
            </div>
          </DropdownMenu>
        </Dropdown>
      )}
      {ableChangeView ? (
        <Dropdown>
          <DropdownToggle>
            <i className={iconViewMode} />
            <i className="icon-arrow-down" />
          </DropdownToggle>
          <DropdownMenu>
            <div
              onClick={() => setViewType(keyBlock, 'code')}
              className={clsx(['item', {active: viewType === 'code'}])}
            >
              <i className="icon-code-comment" /> Code view
            </div>
            <div
              onClick={() => setViewType(keyBlock, 'table')}
              className={clsx(['item', {active: viewType === 'table'}])}
            >
              <i className="icon-table" /> Table view
            </div>
            {isExampleView && (
              <div className={clsx(['item', {active: viewType === 'example'}])}>
                <i className="icon-list" /> Example view
              </div>
            )}
          </DropdownMenu>
        </Dropdown>
      ) : (
        <ButtonDisabled iconName={iconViewMode} />
      )}
      {ableExpandTypes ? (
        <Dropdown params={{isOpen: typesDdVisible, setIsOpen: setTypesDdVisible}}>
          <DropdownToggle>
            <i className={iconTypes} />
            <i className="icon-arrow-down" />
          </DropdownToggle>
          <DropdownMenu>
            <div
              onClick={() => {
                setExpandedTypes(keyBlock, true);
                setTypesDdVisible(false);
              }}
              className={clsx(['item', {active: expandedTypes}])}
            >
              <i className="icon-email" /> Expand types
            </div>
            <div
              onClick={() => {
                setExpandedTypes(keyBlock, false);
                setTypesDdVisible(false);
              }}
              className={clsx(['item', {active: !expandedTypes}])}
            >
              <i className="icon-strikethrough-email" /> Collapse types
            </div>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <ButtonDisabled iconName={iconTypes} />
      )}
      {ableExpandRules ? (
        <Dropdown params={{isOpen: rulesDdVisible, setIsOpen: setRulesDdVisible}}>
          <DropdownToggle>
            <i className={iconRules} />
            <i className="icon-arrow-down" />
          </DropdownToggle>
          <DropdownMenu>
            <div
              onClick={() => {
                setCollapsedRules(keyBlock, true);
                setRulesDdVisible(false);
              }}
              className={clsx(['item', {active: collapsedRules}])}
            >
              <i className="icon-braces-number" /> Collapse rules
            </div>
            <div
              onClick={() => {
                setCollapsedRules(keyBlock, false);
                setRulesDdVisible(false);
              }}
              className={clsx(['item', {active: !collapsedRules}])}
            >
              <i className="icon-braces-dots" /> Inline rules
            </div>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <ButtonDisabled iconName={iconRules} />
      )}
    </div>
  );
};

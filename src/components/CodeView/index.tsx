import React, {useContext, useMemo} from 'react';
import {SchemaType} from 'types/exchange';
import {getUserEnum, getUserType} from 'utils/getResources';
import {CollapsibleContent} from '../CollapsibleContent';
import {CodeViewBaseComponent} from './CodeViewBaseComponent';
import {EnumView} from './EnumView';
import {SchemaView} from 'components/SchemaView';
import {JDocContext} from 'store';
import './CodeView.styles.scss';

interface UsedUserElementProps {
  value: string;
  keyBlock: string;
}

const UsedUserType = ({value, keyBlock}: UsedUserElementProps) => {
  const {jdocExchange: jdocData} = useContext(JDocContext);

  const userType = useMemo(
    () => (jdocData?.userTypes ? getUserType(value, jdocData.userTypes) : null),
    [value, jdocData?.userTypes]
  );

  return (
    <div className="used-element-schema">
      <SchemaView
        keyBlock={keyBlock}
        name={value}
        isCollapsible={true}
        type="code"
        schema={userType?.schema}
        hideUsedElements={true}
      />
    </div>
  );
};

const UsedUserEnum = ({value, keyBlock}: UsedUserElementProps) => {
  const {jdocExchange: jdocData} = useContext(JDocContext);

  const userEnum = useMemo(
    () => (jdocData?.userEnums ? getUserEnum(value, jdocData.userEnums) : null),
    [value, jdocData?.userEnums]
  );

  return (
    <div className="used-element-schema">
      <EnumView keyBlock={keyBlock} content={userEnum?.value} name={value} />
    </div>
  );
};

export interface CodeViewProps {
  schema?: SchemaType;
  format?: string;
  name?: string;
  hideUsedElements?: boolean;
  isCollapsible?: boolean;
  keyBlock: string;
}

/**
 * CodeView - base component with usedTypes and usedEnums
 * @param props
 * @constructor
 */
export const CodeView = (props: CodeViewProps) => {
  return (
    <div className="code-view-wrapper">
      <CodeViewBaseComponent {...props} />
      {!props.hideUsedElements && (
        <>
          {props.schema?.usedUserTypes && (
            <div className="used-element">
              <CollapsibleContent title="Types">
                {props.schema.usedUserTypes.map((value, index) => (
                  <UsedUserType
                    keyBlock={`${props.keyBlock}-ut-${index}`}
                    key={`type-${value}`}
                    value={value}
                  />
                ))}
              </CollapsibleContent>
            </div>
          )}
          {props.schema?.usedUserEnums && (
            <div className="used-element">
              <CollapsibleContent title="Enums">
                {props.schema.usedUserEnums.map((value, index) => (
                  <UsedUserEnum
                    keyBlock={`${props.keyBlock}-ue-${index}`}
                    value={value}
                    key={`enum-${value}`}
                  />
                ))}
              </CollapsibleContent>
            </div>
          )}
        </>
      )}
    </div>
  );
};

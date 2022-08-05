import {UserEnumsType, UserTypesType} from 'types/exchange';

export const getUserType = (typeName?: string, userTypes?: UserTypesType) => {
  return typeName && userTypes && userTypes.hasOwnProperty(typeName) ? userTypes[typeName] : null;
};

export const getUserEnum = (typeName?: string, userEnums?: UserEnumsType) => {
  return typeName && userEnums && userEnums.hasOwnProperty(typeName) ? userEnums[typeName] : null;
};

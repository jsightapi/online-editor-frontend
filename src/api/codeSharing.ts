import {runRequest} from 'utils/runRequest';
const cloudUrl = 'https://cloud.jsight.io';

export type cloudItemType = 'online-editor-project';

export interface CodeSharingItemType {
  type: cloudItemType;
  data: OnlineEditorDataType;
}

export interface OnlineEditorDataType {
  content: 'string';
  options: any;
}

export const createNewState = () => {
  return runRequest(cloudUrl);
};

export const updateState = () => {
  return runRequest(cloudUrl);
};

export const getExistingState = () => {
  return runRequest(cloudUrl);
};

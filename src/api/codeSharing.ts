import {runRequest} from 'utils/runRequest';
const cloudUrl = 'http://cloud.jsight.io/';

export type cloudItemType = 'online-editor-project';

export interface CodeSharingItemType {
  type: cloudItemType;
  data: OnlineEditorDataType;
}

export interface OnlineEditorDataType {
  content: string;
  options: Record<string, unknown>;
}

export interface CodeSharingParamsType {
  version: string;
  code: string;
}

export interface CodeSharingResponseItemType extends CodeSharingItemType, CodeSharingParamsType {
  createdAt: string;
}

export const createNewState = (content: string) => {
  const item: CodeSharingItemType = {
    type: 'online-editor-project',
    data: {
      content,
      options: {},
    },
  };

  return runRequest<CodeSharingParamsType>(`${cloudUrl}item`, {body: JSON.stringify(item)});
};

export const updateState = (code: string, content: string) => {
  const item: CodeSharingItemType = {
    type: 'online-editor-project',
    data: {
      content,
      options: {},
    },
  };

  return runRequest<CodeSharingParamsType>(`${cloudUrl}item/${code}`, {body: JSON.stringify(item)});
};

export const getExistingState = (code: string, version: string) => {
  return runRequest<CodeSharingResponseItemType>(`${cloudUrl}item/${code}/${version}`, {
    method: 'GET',
  });
};

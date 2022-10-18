import {runRequest} from 'utils/runRequest';
export const cloudUrl = process.env.REACT_APP_CLOUD_URL;

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

  return runRequest<CodeSharingParamsType>(`${cloudUrl}/item`, {body: JSON.stringify(item)}, 5000);
};

export const updateState = (code: string, content: string) => {
  const item: CodeSharingItemType = {
    type: 'online-editor-project',
    data: {
      content,
      options: {},
    },
  };

  return runRequest<CodeSharingParamsType>(
    `${cloudUrl}/item/${code}`,
    {body: JSON.stringify(item)},
    5000
  );
};

export const getExistingState = (code: string, version?: string) => {
  return version
    ? runRequest<CodeSharingResponseItemType>(`${cloudUrl}/item/${code}/${version}`, {
        method: 'GET',
      })
    : runRequest<CodeSharingResponseItemType>(`${cloudUrl}/item/${code}/latest`, {method: 'GET'});
};

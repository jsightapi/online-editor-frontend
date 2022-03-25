import {reduce, map} from 'lodash';
import {
  ApiInfoType,
  JDocType,
  ResourceMethodsType,
  ResourcesType,
  ResourceType,
  ServersInfoType,
  TagsType,
  UserEnumsType,
  UserTypesType,
} from './getResources.model';


// get resources with methods
const getResources = (resources: {[key: string]: string[]}, resourceMethods: ResourceMethodsType) =>
  map(resources, (resource, path) => ({
    path,
    methods: resource.reduce<ResourceType[]>((result, value) => {
      if (resourceMethods.hasOwnProperty(value)) {
        return [...result, resourceMethods[value]];
      } else {
        return result;
      }
    }, []),
  }));

export const getTreeResources = (tags: TagsType, resourceMethods: ResourceMethodsType) => {
  return reduce<TagsType, ResourcesType[]>(
    tags,
    (result, value, key) => {
      if (key[0] === '@') {
        const resources = getResources(value.resourceMethods, resourceMethods);
        return [
          ...result,
          {
            title: value.title,
            annotation: value.annotation,
            description: value.description,
            resources,
            count: Object.keys(value.resourceMethods).length,
          },
        ];
      } else {
        return result;
      }
    },
    []
  );
};

export const getUserType = (typeName?: string, userTypes?: UserTypesType) => {
  return typeName && userTypes && userTypes.hasOwnProperty(typeName) ? userTypes[typeName] : null;
};

export const getUserEnum = (typeName?: string, userEnums?: UserEnumsType) => {
  return typeName && userEnums && userEnums.hasOwnProperty(typeName) ? userEnums[typeName] : null;
};


export const createJdocList = (jdocExchange: JDocType): [any[], number[]] => {
  const {tags, resourceMethods, userTypes, info, servers, userEnums} = jdocExchange;
  const resources = getTreeResources(tags, resourceMethods);
  const jdocList = [];
  const jdocGroupCount = [];

  if (info) {
    jdocList.push(info);
    jdocGroupCount.push(1);
  }

  if (servers) {
    jdocList.push(servers);
    // TODO: Put back when server list rendering is virtualized
    // jdocGroupCount.push(Object.keys(servers).length);
    jdocGroupCount.push(1);
  }

  if (!!resources.length) {
    jdocList.push(resources);
    // TODO: Put back when resource list rendering is virtualized
    // jdocGroupCount.push(resources.length);
    jdocGroupCount.push(1);
  }

  if (userTypes) {
    jdocList.push(userTypes);
    jdocGroupCount.push(Object.keys(userTypes).length);
  }

  if (userEnums) {
    jdocList.push(userEnums);
    jdocGroupCount.push(Object.keys(userEnums).length);
  }

  return [jdocList, jdocGroupCount];
};

import {reduce, map} from 'lodash';
import {
  ResourceMethodsType,
  ResourcesType,
  ResourceType,
  TagsType,
  UserEnumsType,
  UserTypesType,
} from 'types/exchange';

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

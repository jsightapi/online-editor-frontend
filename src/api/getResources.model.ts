export type scalarType = string | number | boolean | null;

export interface ResourceMethodsType {
  [key: string]: ResourceInputType;
}

export interface JDocType {
  jsight: string;
  info?: ApiInfoType;
  servers?: ServersInfoType;
  tags: TagsType;
  resourceMethods: ResourceMethodsType;
  userTypes?: UserTypesType;
  userEnums?: UserEnumsType;
}

export interface BodyType {
  format: string;
  schema: SchemaType;
}

export interface HeaderType {
  schema: SchemaType;
}

export interface ResponsesType {
  code: string;
  annotation?: string;
  headers?: HeaderType;
  body: BodyType;
}

export interface RequestType {
  body: BodyType;
  headers?: {
    format?: string;
    schema: SchemaType;
  };
}

export interface ResourceType {
  httpMethod: string;
  path: string;
  annotation?: string;
  description?: string;
  responses?: ResponsesType[];
  tags: string[];
  pathVariables?: {schema: SchemaType};
  query?: {schema?: SchemaType; example?: string; format: string};
  request?: RequestType;
}

export interface ResourcePathType {
  path: string;
  methods?: ResourceType[];
}

export interface ResourcesType {
  title: string;
  annotation: string;
  description: string;
  resources: ResourcePathType[];
  count: number;
}

export interface TagsType {
  [key: string]: {
    title: string;
    annotation: string;
    description: string;
    resourceMethods: {
      [key: string]: string[];
    };
  };
}

export interface ResourceInputType {
  httpMethod: string;
  path: string;
  annotation?: string;
  description?: string;
  responses?: any[];
  tags: string[];
  pathVariables?: any;
  query?: any;
  request?: any;
}

export interface RuleType {
  jsonType: string;
  scalarValue?: scalarType;
  items?: SchemaJSightContentType[];
}

export interface RulesType {
  [key: string]: RuleType;
}

export interface SchemaJSightContentType {
  isKeyShortcut?: boolean;
  jsonType: string;
  optional: boolean;
  type?: string;
  scalarValue?: scalarType;
  note?: string;
  inheritedFrom?: string;
  items?: SchemaJSightContentType[];
  rules?: RulesType;
  properties?: {
    [key: string]: SchemaJSightContentType | undefined;
  };
}

export interface SchemaType {
  notation: string; // 'jsight' | 'regex' | 'any';
  content: SchemaJSightContentType;
  usedUserTypes?: string[];
  usedUserEnums?: string[];
  example: string;
}

export interface ApiInfoType {
  title: string;
  version: string;
  description: string;
}

export interface ServerType {
  annotation?: string;
  baseUrl: string;
  baseUrlVariables?: {
    schema: SchemaType;
  };
}

export interface ServersInfoType {
  [key: string]: ServerType;
}

export interface UserEnumItemType {
  jsonType: string;
  note?: string;
  scalarValue?: string;
}

export interface UserEnumValueType {
  jsonType: string;
  items: UserEnumItemType[];
}

export interface LinkType {
  type: string;
  address: {
    resourceMethod?: string;
    type?: string;
  };
}

export interface UserEnumType {
  annotation?: string;
  value: SchemaJSightContentType;
  links: LinkType[];
}

export interface UserEnumsType {
  [key: string]: UserEnumType;
}

export interface UserTypeType {
  annotation?: string;
  schema: SchemaType;
  links: LinkType[];
}

export interface UserTypesType {
  [key: string]: UserTypeType;
}

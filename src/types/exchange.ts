// export type scalarType = string | number | boolean | null;
export type httpMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type schemaNotationType = 'jsight' | 'regex' | 'any' | 'empty';
export type serializeFormatType =
  | 'json'
  | 'plainString'
  | 'binary'
  | 'htmlFormEncoded'
  | 'noFormat';
export type ruleNameType =
  | 'type'
  | 'optional'
  | 'nullable'
  | 'min'
  | 'max'
  | 'exclusiveMinimum'
  | 'exclusiveMaximum'
  | 'precision'
  | 'minLength'
  | 'maxLength'
  | 'regexp'
  | 'minItems'
  | 'maxItems'
  | 'or'
  | 'additionalProperties'
  | 'const'
  | 'serializeFormat'
  | 'serializedType'
  | 'enum'
  | 'allOf';

export interface JDocType {
  jsight: string;
  info?: ApiInfoType;
  servers?: ServersInfoType;
  tags: TagsType;
  interactions: {[key: string]: HttpInteractionType | JsonRpcInteractionType};
  userTypes?: UserTypesType;
  userEnums?: UserEnumsType;
}

export interface UserTypesType {
  [key: string]: UserTypeType;
}

interface UserEnumsType {
  [key: string]: UserRuleType;
}

export interface ApiInfoType {
  title: string;
  version: string;
  description: string;
}

export interface ServerType {
  annotation?: string;
  baseUrl: string;
}

export interface ServersInfoType {
  [key: string]: ServerType;
}

export interface TagsType {
  [key: string]: TagType;
}

export interface TagType {
  name: string;
  title: string;
  annotation?: string;
  description?: string;
  interactionGroups: TagInteractionGroup[];
  children?: TagsType;
}

export interface TagInteractionGroup {
  protocol: string; // http | json-rpc-2.0
  interactions: string[];
}

export interface HttpInteractionType {
  id: string;
  protocol: string; // http
  httpMethod: httpMethodType;
  path: string;
  pathVariables?: {
    schema: SchemaType;
  };
  tags: string[];
  annotation?: string;
  description?: string;
  query?: QueryType;
  request?: HttpRequestType;
  responses?: HttpResponseType[];
}

export interface JsonRpcInteractionType {
  id: string;
  protocol: string; // json-rpc-2.0
  path: string;
  method: string;
  pathVariables?: {
    schema: SchemaType;
  };
  tags: string[];
  annotation?: string;
  description?: string;
  params: SchemaType;
  result: SchemaType;
}

export interface SchemaType {
  notation: schemaNotationType;
  content: JsightSchemaElement | string;
  usedUserTypes?: string[];
  usedUserEnums?: string[];
  example?: string;
}

export interface JsightSchemaElement {
  key?: string;
  isKeyUserTypeRef?: boolean;
  tokenType: string;
  type: string;
  optional: boolean;
  scalarValue?: string;
  inheritedFrom?: string;
  note?: string;
  rules?: RuleType[];
  children?: JsightSchemaElement[];
}

export interface QueryType {
  example?: string;
  format: serializeFormatType;
  schema: SchemaType;
}

export interface HttpRequestType {
  headers?: {
    schema: SchemaType;
  };
  body: {
    format: serializeFormatType;
    schema: SchemaType;
  };
}

export interface HttpResponseType {
  code: string;
  annotation?: string;
  headers: {
    schema: SchemaType;
  };
  body: {
    format: serializeFormatType;
    schema: SchemaType;
  };
}

export interface UserTypeType {
  annotation?: string;
  description?: string;
  schema: SchemaType;
}

export interface UserRuleType {
  annotation: string;
  description: string;
  value: RuleType;
}

export interface RuleType {
  key: ruleNameType;
  tokenType: string;
  scalarValue?: string;
  children: RuleType[];
}

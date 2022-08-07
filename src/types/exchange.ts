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
export type InteractionType = HttpInteractionType | JsonRpcInteractionType;
export type tokenTypeType =
  | 'object'
  | 'array'
  | 'string'
  | 'number'
  | 'boolean'
  | 'null'
  | 'annotation'
  | 'reference';

export interface JDocType {
  jdocExchangeVersion: string;
  jsight: string;
  info?: ApiInfoType;
  servers?: ServersInfoType;
  tags: TagsType;
  interactions: {[key: string]: InteractionType};
  userTypes?: UserTypesType;
  userEnums?: UserEnumsType;
}

export interface UserTypesType {
  [key: string]: UserTypeType;
}

export interface UserEnumsType {
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
  interactionGroups: TagInteractionGroupType[];
  children?: TagsType;
}

export interface TagInteractionGroupType {
  protocol: string; // http | json-rpc-2.0
  interactions: string[];
}

export interface InteractionsWithProtocolType {
  protocol: string; // http | json-rpc-2.0
  interactions: InteractionType[];
}

interface InteractionBaseType {
  id: string;
  protocol: string; // http | json-rpc-2.0
  path: string;
  pathVariables?: {
    schema: SchemaType;
  };
  tags: string[];
  annotation?: string;
  description?: string;
}

export interface HttpInteractionType extends InteractionBaseType {
  httpMethod: httpMethodType;
  query?: QueryType;
  request?: HttpRequestType;
  responses?: HttpResponseType[];
}

export interface JsonRpcInteractionType extends InteractionBaseType {
  method: string;
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
  tokenType: tokenTypeType;
  type: string; //
  optional: boolean;
  scalarValue?: string;
  inheritedFrom?: string;
  note?: string | JSX.Element;
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
  tokenType: tokenTypeType;
  note?: string;
  scalarValue?: string;
  children?: RuleType[];
}

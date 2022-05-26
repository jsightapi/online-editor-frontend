export interface ErrorType {
  Column: number;
  Index: number;
  Line: number;
  Message: string;
  Status: string;
  Code?: number;
}

export interface ErrorSimpleType {
  code: number;
  message: string;
}

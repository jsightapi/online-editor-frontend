const scalarNames = ['string', 'number', 'boolean', 'null'];

export const getScalarClassName = (type: string): string => {
  return scalarNames.includes(type) ? `value-${type}` : 'value-string';
};

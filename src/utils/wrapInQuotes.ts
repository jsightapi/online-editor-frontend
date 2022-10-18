export const wrapInQuotes = (
  value: string | number | boolean | null,
  withoutWrap = false
): string | number | boolean | null => {
  if (!withoutWrap) {
    return JSON.stringify(value);
  }

  return value;
};

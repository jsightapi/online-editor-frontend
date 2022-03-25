export const countWords = (value?: string) => {
  return value ? value?.split(/[\s\?]+/).length : 0;
};

export const shorten = (str: string, max: number, tail = '…'): string => {
  const text = str.replace(/\s\s+/g, ' ');

  return text.length > max ? text.slice(0, max).split(' ').slice(0, -1).join(' ') + tail : text;
};

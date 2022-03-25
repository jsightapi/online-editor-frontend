export const formatNotes = (note?: string) => {
  return (note || '').replace(/ +/g, ' ').replace(/\n/g, '').trim();
};

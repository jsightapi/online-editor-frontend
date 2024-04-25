export const updateMessageWithUrl = (message: string) => {
  const pattern = /(https?:\/\/[^\s]+)/gi;

  return message.replace(pattern, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
};

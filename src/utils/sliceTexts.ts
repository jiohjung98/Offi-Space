export const sliceText = (text: string, maxLength: number) => {
  if (text) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '... ';
    } else {
      return text;
    }
  }
};

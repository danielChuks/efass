/**
 * @description This method capitalises any text passed to it. Useful for capitalising full names.
 * The capitalised format of the text 'sam mbakwe' is 'Sam Mbakwe' and 'SAM MBAKWE' would be 'Sam Mbakwe'.
 * @param text The text to be capitalised.
 * @returns The capitalised form of the text passed to the function.
 */
export const capitaliseText = (text: string) => {
  if (!text) return text;

  const wordsArray = text.split(' ');

  const lowerCaseWords = wordsArray.map(word => word.toLowerCase());

  const capitalisedWords = lowerCaseWords.map(word => {
    const firstLetter = word.charAt(0);
    word = word.replace(firstLetter, firstLetter.toUpperCase());
    return word;
  });

  return capitalisedWords.join(' ');
};

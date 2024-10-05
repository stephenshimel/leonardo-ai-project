/**
 * Checks if the given page number is valid.
 * @param page The page number to validate.
 * @returns True if the page number is a whole number greater than 0, false otherwise.
 */
export const isValidPageNumber = (page: number): boolean => {
  return Number.isInteger(page) && page > 0;
};

/**
 * Checks if the given page number is valid.
 * @param page The page number to validate.
 * @returns True if the page number is a whole number greater than 0, false otherwise.
 */
export const isValidPageNumber = (page: number): boolean => {
  return Number.isInteger(page) && page > 0;
};

import { NextRouter } from "next/router";

/**
 * Redirects to a specified page by updating the 'page' query parameter.
 * @param router The Next.js router instance.
 * @param pageNumber The page number to redirect to.
 */
export const redirectToPage = (
  router: NextRouter,
  pageNumber: number,
): void => {
  router.replace(
    {
      pathname: router.pathname,
      query: { ...router.query, page: pageNumber },
    },
    undefined,
    { shallow: true },
  );
};

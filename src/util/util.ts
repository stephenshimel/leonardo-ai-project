/**
 * Checks if the given page number is valid.
 * @param page The page number to validate.
 * @returns True if the page number is a whole number greater than 0, false otherwise.
 */
export const isValidPageNumber = (page: number): boolean => {
  return Number.isInteger(page) && page > 0;
};

import { NextRouter } from "next/router";
import { UserInfo } from "@/src/component/types";

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

/**
 * Reads user information from localStorage.
 * @returns The user information if it exists, undefined otherwise.
 */
export const getUserInfoFromLocalStorage = (): UserInfo | undefined => {
  const storedUserInfo = localStorage.getItem("userInfo");
  return storedUserInfo ? JSON.parse(storedUserInfo) : undefined;
};

/**
 * Sets user information in localStorage.
 * @param userInfo The user information to store.
 */
export const setUserInfoInLocalStorage = (userInfo: UserInfo): void => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

/**
 * Removes user information from localStorage.
 */
export const removeUserInfoFromLocalStorage = (): void => {
  localStorage.removeItem("userInfo");
};

/**
 * Logs out the user by removing user information from localStorage and redirecting to the first page.
 * @param router The Next.js router instance.
 */
export const logOut = (router: NextRouter): void => {
  removeUserInfoFromLocalStorage();
  router
    .push({
      pathname: router.pathname,
      query: { page: 1 },
    })
    .then(() => {
      router.reload();
    });
};

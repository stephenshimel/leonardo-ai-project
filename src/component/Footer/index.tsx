import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useCallback } from "react";
import { footerContainerStyles, buttonStyles } from "./styles";
import { isValidPageNumber, redirectToPage } from "@/src/util/util";

interface FooterProps {
  page?: number;
  setPage: (newPage: number) => void;
  totalPages: number;
}

export const Footer = ({ page, setPage, totalPages }: FooterProps) => {
  const router = useRouter();
  const handlePageChange = useCallback(
    (newPage: number) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: newPage },
      });
    },
    [router],
  );

  // allow user to change page by editing url
  useEffect(() => {
    if (!router.isReady) return;

    const pageFromUrl = Number(router.query.page);
    const validPage = isValidPageNumber(pageFromUrl) ? pageFromUrl : 1;

    if (validPage !== page) {
      redirectToPage(router, validPage);
      setPage(validPage);
    }
  }, [router, setPage, page]);

  if (!page) return null;

  return (
    <Box {...footerContainerStyles} aria-label="Pagination">
      <HStack spacing={4}>
        <Button
          onClick={() => handlePageChange(page - 1)}
          isDisabled={page === 1}
          aria-label="Go to previous page"
        >
          Previous
        </Button>

        <Text>
          Page {page} of {totalPages}
        </Text>

        <Button
          onClick={() => handlePageChange(page + 1)}
          {...buttonStyles}
          isDisabled={page >= totalPages}
          aria-label="Go to next page"
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

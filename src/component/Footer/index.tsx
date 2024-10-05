import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { footerContainerStyles, buttonStyles } from "./styles";
import { isValidPageNumber } from "@/src/util/util";

interface FooterProps {
  page?: number;
  setPage: (newPage: number) => void;
}

export const Footer = ({ page, setPage }: FooterProps) => {
  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  // allow user to change page by editing url
  useEffect(() => {
    if (!router.isReady) return;

    const pageFromUrl = Number(router.query.page);
    const validPage = isValidPageNumber(pageFromUrl) ? pageFromUrl : 1;

    if (validPage !== page) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, page: validPage },
        },
        undefined,
        { shallow: true },
      ); //TODO: move redirect to first page to a util
      setPage(validPage);
    }
  }, [router, setPage, page]);

  if (!page) return null;

  return (
    <Box {...footerContainerStyles}>
      <Button
        onClick={() => handlePageChange(page - 1)}
        isDisabled={page === 1}
      >
        Previous
      </Button>
      <Button onClick={() => handlePageChange(page + 1)} {...buttonStyles}>
        Next
      </Button>
    </Box>
  );
};

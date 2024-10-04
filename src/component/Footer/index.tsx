import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { footerContainerStyles, buttonStyles } from "./styles";

interface FooterProps {
  page: number;
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
    const pageFromUrl = Number(router.query.page) || 1;
    setPage(pageFromUrl);
  }, [router.query.page]);

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

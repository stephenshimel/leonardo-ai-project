import { Box, Button } from '@chakra-ui/react';

interface FooterProps {
  page: number;
  setPage: (newPage: number) => void;
}

const Footer = ({ page, setPage }: FooterProps) => {
  return (
    <Box mt={4} textAlign="center">
      <Button onClick={() => setPage(page - 1)} isDisabled={page === 1}>
        Previous
      </Button>
      <Button onClick={() => setPage(page + 1)} ml={4}>
        Next
      </Button>
    </Box>
  );
};

export default Footer;

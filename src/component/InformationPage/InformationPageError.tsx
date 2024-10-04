import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface InformationPageErrorProps {
  error: Error;
}

const InformationPageError: React.FC<InformationPageErrorProps> = ({
  error,
}) => {
  return (
    <Box textAlign="center" p={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Error fetching data
      </Text>
      <Text mb={4}>
        We're sorry, but there was an error retrieving the character
        information.
      </Text>
    </Box>
  );
};

export default InformationPageError;

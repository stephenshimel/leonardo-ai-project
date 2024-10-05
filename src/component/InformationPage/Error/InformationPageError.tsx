import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { containerStyles, titleStyles, messageStyles } from "./styles";

interface InformationPageErrorProps {
  error: Error;
}

const InformationPageError: React.FC<InformationPageErrorProps> = ({
  error,
}) => {
  return (
    <Box {...containerStyles}>
      <Text {...titleStyles}>Error fetching data</Text>
      <Text {...messageStyles}>
        We're sorry, but there was an error retrieving the character
        information.
      </Text>
    </Box>
  );
};

export default InformationPageError;

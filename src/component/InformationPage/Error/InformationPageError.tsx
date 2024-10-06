import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { containerStyles, titleStyles, messageStyles } from "./styles";

export const InformationPageError: React.FC = () => {
  return (
    <Box {...containerStyles} data-testid="information-page-error">
      <Text {...titleStyles} data-testid="error-title">
        Error fetching data
      </Text>
      {/* not showing exactly query error message, in order to not give internal information to the user */}
      <Text {...messageStyles} data-testid="error-message">
        We're sorry, but there was an error retrieving the character
        information.
      </Text>
    </Box>
  );
};

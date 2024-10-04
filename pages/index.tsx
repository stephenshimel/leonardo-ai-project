import { Box, Heading, Text, Button } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box p={8}>
      <Heading as="h1" mb={4}>
        Welcome to Chakra UI with Next.js
      </Heading>
      <Text fontSize="lg" mb={4}>
        Chakra UI makes it easy to build accessible React apps.
      </Text>
      <Button colorScheme="teal" size="md">
        Get Started
      </Button>
    </Box>
  );
};

export default HomePage;
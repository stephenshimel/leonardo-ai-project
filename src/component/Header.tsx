import { Flex, Box, Text, Button } from '@chakra-ui/react';

interface HeaderProps {
  username: string;
  jobTitle: string;
  onChangeUser: () => void; // Function to be called when "Change User" button is clicked
}

export const Header = ({ username, jobTitle, onChangeUser }: HeaderProps) => {
  return (
    <Flex
      as="header"
      width="100%"
      padding="1rem"
      backgroundColor="teal.500"
      color="white"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Left side - Logo or App Name */}
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          My App
        </Text>
      </Box>

      {/* Right side - Username, Job Title, and Change User button */}
      <Flex alignItems="center">
        <Box textAlign="right" mr={4}>
          <Text fontSize="md" fontWeight="bold">
            {username}
          </Text>
          <Text fontSize="sm">{jobTitle}</Text>
        </Box>

        <Button colorScheme="orange" variant="outline" onClick={onChangeUser}>
          Change User
        </Button>
      </Flex>
    </Flex>
  );
};


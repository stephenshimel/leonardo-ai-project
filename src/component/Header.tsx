import { Flex, Box, Text, Button } from '@chakra-ui/react';

// TODO: move types to separate file
export type UserInfo = {
  username: string;
  jobTitle: string;
};

interface HeaderProps {
  userInfo?: UserInfo;
  onChangeUser?: () => void;
}

export const Header = ({ userInfo, onChangeUser }: HeaderProps) => {
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
        {userInfo && (
          <Box textAlign="right" mr={4}>
            <Text fontSize="md" fontWeight="bold">
              {userInfo.username}
            </Text>
            <Text fontSize="sm">{userInfo.jobTitle}</Text>
          </Box>
        )}

        <Button colorScheme="orange" variant="outline" onClick={onChangeUser}>
          Change User
        </Button>
      </Flex>
    </Flex>
  );
};


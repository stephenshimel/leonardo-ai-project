import { Flex, Box, Text, Button } from "@chakra-ui/react";
import React from "react";
import {
  headerContainerStyles,
  logoContainerStyles,
  logoTextStyles,
  userInfoContainerStyles,
  userInfoBoxStyles,
  usernameStyles,
  jobTitleStyles,
  labelStyles,
  valueStyles,
  changeUserButtonStyles,
} from "./styles";

// TODO: move types to separate file
export type UserInfo = {
  username: string;
  jobTitle: string;
};

type HeaderProps = {
  userInfo?: UserInfo;
  onChangeUser?: () => void;
};

export const Header = ({ userInfo, onChangeUser }: HeaderProps) => {
  return (
    <Flex {...headerContainerStyles}>
      <Box {...logoContainerStyles}>
        <Text {...logoTextStyles}>Rick and Morty Gallery</Text>
      </Box>

      <Flex {...userInfoContainerStyles}>
        {userInfo && (
          <Box {...userInfoBoxStyles}>
            <Text {...usernameStyles}>
              <Text {...labelStyles}>Username:</Text>{" "}
              <Text {...valueStyles}>{userInfo.username}</Text>
            </Text>
            <Text {...jobTitleStyles}>
              <Text {...labelStyles}>Job Title:</Text>{" "}
              <Text {...valueStyles}>{userInfo.jobTitle}</Text>
            </Text>
          </Box>
        )}

        <Button {...changeUserButtonStyles} onClick={onChangeUser}>
          Change User
        </Button>
      </Flex>
    </Flex>
  );
};

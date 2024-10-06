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
    <Flex {...headerContainerStyles} as="header" aria-label="Page header">
      <Box {...logoContainerStyles}>
        <Text {...logoTextStyles} aria-label="Website title">
          Rick and Morty Gallery
        </Text>
      </Box>

      <Flex {...userInfoContainerStyles}>
        {userInfo && (
          <Box {...userInfoBoxStyles} aria-label="User information">
            <Text {...usernameStyles}>
              <Text {...labelStyles}>Username:</Text>{" "}
              <Text {...valueStyles} aria-label="Username">
                {userInfo.username}
              </Text>
            </Text>
            <Text {...jobTitleStyles}>
              <Text {...labelStyles}>Job Title:</Text>{" "}
              <Text {...valueStyles} aria-label="Job title">
                {userInfo.jobTitle}
              </Text>
            </Text>
          </Box>
        )}

        <Button
          {...changeUserButtonStyles}
          onClick={onChangeUser}
          aria-label="Change user information"
        >
          Change User
        </Button>
      </Flex>
    </Flex>
  );
};

import { Flex, Box, Text, Button } from "@chakra-ui/react";
import React, { useCallback } from "react";
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
  buttonContainerStyles,
} from "./styles";
import { UserInfo } from "../types";
import { useRouter } from "next/router";
import { removeUserInfoFromLocalStorage, logOut } from "@/src/util/util";

type HeaderProps = {
  userInfo?: UserInfo;
  onChangeUser?: () => void;
};

export const Header = ({ userInfo, onChangeUser }: HeaderProps) => {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    logOut(router);
  }, [router]);

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

        <Flex {...buttonContainerStyles}>
          <Button
            {...changeUserButtonStyles}
            onClick={onChangeUser}
            aria-label="Change user information"
          >
            Change User
          </Button>
          <Button
            {...changeUserButtonStyles}
            onClick={handleLogout}
            aria-label="Log out"
          >
            Log Out
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

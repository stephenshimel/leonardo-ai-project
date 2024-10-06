import { FlexProps, BoxProps, TextProps, ButtonProps } from "@chakra-ui/react";

export const headerContainerStyles: FlexProps = {
  as: "header",
  width: "100%",
  padding: "1rem",
  backgroundColor: "teal.500",
  color: "white",
  flexDirection: { base: "column", md: "row" },
  alignItems: { base: "flex-start", md: "center" },
  justifyContent: { base: "flex-start", md: "space-between" },
};

export const logoContainerStyles: BoxProps = {
  marginBottom: { base: "1rem", md: 0 },
};

export const logoTextStyles: TextProps = {
  fontSize: "xl",
  fontWeight: "bold",
};

export const userInfoContainerStyles: FlexProps = {
  alignItems: "center",
  width: { base: "100%", md: "auto" },
  justifyContent: { base: "space-between", md: "flex-start" },
  flexDirection: { base: "column", md: "row" },
};

export const userInfoBoxStyles: BoxProps = {
  textAlign: "left",
  mr: { base: 0, md: 4 },
  mb: { base: "1rem", md: 0 },
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "100%",
};

export const usernameStyles: TextProps = {
  fontSize: "md",
  fontWeight: "normal",
  mb: 2,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const jobTitleStyles: TextProps = {
  fontSize: "md",
  fontWeight: "normal",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const labelStyles: TextProps = {
  as: "span",
  fontWeight: "bold",
  color: "yellow.300",
  marginRight: "0.5rem",
};

export const valueStyles: TextProps = {
  as: "span",
  fontStyle: "italic",
  fontSize: "md",
  fontWeight: "normal",
};

export const buttonContainerStyles: FlexProps = {
  width: "100%",
  justifyContent: "space-between",
  flexDirection: "row",
};

export const changeUserButtonStyles: ButtonProps = {
  colorScheme: "yellow",
  variant: "outline",
  color: "white",
  borderColor: "yellow.300",
  _hover: {
    bg: "yellow.500",
    color: "teal.800",
  },
  flex: 1,
  mr: 2,
};

export const logoutButtonStyles: ButtonProps = {
  ...changeUserButtonStyles,
  mr: 0,
  ml: 2,
};

import { BoxProps, ImageProps } from "@chakra-ui/react";

export const cardStyles: BoxProps = {
  borderWidth: "1px",
  borderRadius: "lg",
  overflow: "hidden",
  cursor: "pointer",
  maxWidth: "200px",
  maxHeight: "300px",
  width: "100%",
  height: "100%",
};

export const imageContainerStyles: BoxProps = {
  width: "100%",
  paddingBottom: "100%",
  position: "relative",
  overflow: "hidden",
};

export const imageStyles: ImageProps = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
};

export const textContainerStyles: BoxProps = {
  p: 4,
};

export const textStyles = {
  fontWeight: "bold",
  fontSize: "sm",
  textAlign: "center" as const,
};

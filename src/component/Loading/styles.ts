import { BoxProps, GridProps } from "@chakra-ui/react";

export const containerStyles: BoxProps = {
  p: 8,
};

export const gridStyles: GridProps = {
  templateColumns: {
    base: "repeat(2, 1fr)",
    md: "repeat(4, 1fr)",
    lg: "repeat(5, 1fr)",
  },
  gap: 6,
};

export const cardStyles: BoxProps = {
  borderWidth: "1px",
  borderRadius: "lg",
  overflow: "hidden",
  maxWidth: "200px",
  maxHeight: "300px",
  width: "100%",
  height: "100%",
};

export const imageSkeletonStyles: BoxProps = {
  width: "100%",
  paddingBottom: "100%",
  position: "relative",
};

export const textSkeletonContainerStyles: BoxProps = {
  p: 4,
};

export const textSkeletonStyles: BoxProps = {
  height: "20px",
  width: "80%",
};

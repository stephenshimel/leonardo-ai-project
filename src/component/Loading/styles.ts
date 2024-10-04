import { BoxProps, GridProps } from "@chakra-ui/react";

export const containerStyles: BoxProps = {
  p: 8,
};

export const gridStyles: GridProps = {
  templateColumns: {
    base: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(6, 1fr)",
  },
  gap: 6,
};

export const cardStyles: BoxProps = {
  borderWidth: "1px",
  borderRadius: "lg",
  overflow: "hidden",
  height: "300px",
};

export const imageSkeletonStyles: BoxProps = {
  height: "200px",
};

export const textSkeletonContainerStyles: BoxProps = {
  p: 4,
};

export const textSkeletonStyles: BoxProps = {
  height: "20px",
  width: "80%",
};

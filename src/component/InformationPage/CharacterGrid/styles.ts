import { BoxProps, GridProps } from "@chakra-ui/react";

export const containerStyles: BoxProps = {
  p: 8,
};

export const gridStyles: GridProps = {
  display: "grid",
  gridTemplateColumns: {
    base: "repeat(auto-fill, minmax(100px, 1fr))",
    md: "repeat(auto-fill, minmax(120px, 1fr))",
    lg: "repeat(auto-fill, minmax(210px, 1fr))",
  },
  gap: 6,
  justifyContent: "center",
};

export const cardStyles = {
  width: { base: "100px", md: "120px", lg: "210px" },
  height: { base: "140px", md: "160px", lg: "280px" },
};

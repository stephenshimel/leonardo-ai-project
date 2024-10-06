import { BoxProps, GridProps } from "@chakra-ui/react";

export const containerStyles: BoxProps = {
  p: 8,
  maxWidth: "100%",
  margin: "0 auto",
};

export const gridStyles: GridProps = {
  display: "grid",
  gridTemplateColumns: {
    base: "repeat(2, 1fr)",
    sm: "repeat(2, 1fr)",
    md: "repeat(4, 1fr)",
    lg: "repeat(5, 1fr)",
  },
  gap: { base: 2, sm: 3, md: 4, lg: 6 },
  justifyContent: "center",
};

export const cardStyles = {
  width: "100%",
  height: { base: "140px", sm: "160px", md: "180px", lg: "280px" },
  maxWidth: { base: "150px", sm: "150px", md: "150px", lg: "210px" },
  margin: "0 auto",
};

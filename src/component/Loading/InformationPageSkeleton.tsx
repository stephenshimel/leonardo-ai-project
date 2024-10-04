import React from "react";
import { Box, Grid, Skeleton } from "@chakra-ui/react";
import {
  containerStyles,
  gridStyles,
  cardStyles,
  imageSkeletonStyles,
  textSkeletonContainerStyles,
  textSkeletonStyles,
} from "./styles";

const InformationPageSkeleton: React.FC = () => {
  return (
    <Box {...containerStyles}>
      <Grid {...gridStyles}>
        {[...Array(18)].map((_, index) => (
          <Box key={index} {...cardStyles}>
            <Skeleton {...imageSkeletonStyles} />
            <Box {...textSkeletonContainerStyles}>
              <Skeleton {...textSkeletonStyles} />
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default InformationPageSkeleton;

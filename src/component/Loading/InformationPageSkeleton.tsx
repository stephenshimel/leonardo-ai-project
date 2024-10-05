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
    <Box {...containerStyles} data-testid="skeleton-container">
      <Grid {...gridStyles} data-testid="skeleton-grid">
        {[...Array(18)].map((_, index) => (
          <Box key={index} {...cardStyles} role="article">
            <Skeleton {...imageSkeletonStyles} data-testid="skeleton-image" />
            <Box {...textSkeletonContainerStyles}>
              <Skeleton {...textSkeletonStyles} data-testid="skeleton-text" />
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default InformationPageSkeleton;

import React from "react";
import { Box, Grid, Skeleton } from "@chakra-ui/react";

const InformationPageSkeleton: React.FC = () => {
  return (
    <Box p={8}>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        gap={6}
      >
        {[...Array(18)].map((_, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            height="300px"
          >
            <Skeleton height="200px" />
            <Box p={4}>
              <Skeleton height="20px" width="80%" />
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default InformationPageSkeleton;

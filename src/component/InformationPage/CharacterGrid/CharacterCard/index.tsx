import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import {
  cardStyles,
  imageContainerStyles,
  imageStyles,
  textContainerStyles,
  textStyles,
} from "./styles";

type CharacterCardProps = {
  name: string;
  image: string;
  onClick: () => void;
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  image,
  onClick,
}) => {
  // TODO: loading status on card level
  return (
    <Box
      {...cardStyles}
      onClick={onClick}
      aria-label={`Character card for ${name}`}
    >
      <Box {...imageContainerStyles}>
        <Image
          src={image}
          alt={name}
          {...imageStyles}
          aria-label={`Image of ${name}`}
        />
      </Box>
      <Box {...textContainerStyles}>
        <Text {...textStyles} aria-label={`Name: ${name}`}>
          {name}
        </Text>
      </Box>
    </Box>
  );
};

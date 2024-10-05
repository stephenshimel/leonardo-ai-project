import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import {
  cardStyles,
  imageContainerStyles,
  imageStyles,
  textContainerStyles,
  textStyles,
} from "./styles";

interface CharacterCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  image,
  onClick,
}) => {
  // TODO: loading status on card level
  return (
    <Box {...cardStyles} onClick={onClick}>
      <Box {...imageContainerStyles}>
        <Image src={image} alt={name} {...imageStyles} />
      </Box>
      <Box {...textContainerStyles}>
        <Text {...textStyles}>{name}</Text>
      </Box>
    </Box>
  );
};


import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

interface CharacterCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  image,
  onClick,
}) => {
  // TODO: loading status on card level
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={onClick}
      cursor="pointer"
    >
      <Image src={image} alt={name} />
      <Box p={4}>
        <Text fontWeight="bold">{name}</Text>
      </Box>
    </Box>
  );
};

export default CharacterCard;

import React from "react";
import { Box, Grid, Image, Text } from "@chakra-ui/react";
import CharacterCard from "./CharacterCard";

interface Character {
  name: string;
  image: string;
}

interface CharacterGridProps {
  characters: Character[];
  onCharacterClick: (index: number) => void;
}

const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  onCharacterClick,
}) => {
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
        {characters.map((character, index: number) => (
          <CharacterCard
            key={index}
            name={character.name}
            image={character.image}
            onClick={() => onCharacterClick(index)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default CharacterGrid;

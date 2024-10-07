import React, { useState, useCallback } from "react";
import { Box, Grid, useDisclosure } from "@chakra-ui/react";

import { ImageDetailsModal } from "../../modal/ImageDetailsModal";
import type { Character } from "@/src/apollo/types/types";
import InformationPageSkeleton from "../../Loading/InformationPageSkeleton";
import { CharacterCard } from "./CharacterCard";
import { containerStyles, gridStyles } from "./styles";
import { InformationPageError } from "../Error/InformationPageError";

interface CharacterGridProps {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  isLoading,
  isError,
}) => {
  const [selectedItem, setSelectedItem] = useState<number | undefined>();

  const {
    isOpen: isImageDetailsModalOpen,
    onOpen: openImageDetailsModal,
    onClose: closeImageDetailsModal,
  } = useDisclosure();

  const handleClickItem = useCallback(
    (item: number) => {
      setSelectedItem(item);
      openImageDetailsModal();
    },
    [openImageDetailsModal, setSelectedItem],
  );

  if (isLoading) return <InformationPageSkeleton />;

  if (isError) return <InformationPageError />;

  return (
    <>
      <Box {...containerStyles} aria-label="Character grid container">
        <Grid {...gridStyles} aria-label="Grid of Rick and Morty characters">
          {characters.map((character, index) => (
            <CharacterCard
              key={character.id}
              name={character.name}
              image={character.image}
              onClick={() => handleClickItem(index)}
              aria-label={`Character card for ${character.name}`}
            />
          ))}
        </Grid>
      </Box>

      {/* Using strict equality (!==) to handle the case when selectedItem is 0 */}
      {selectedItem !== undefined && (
        <ImageDetailsModal
          isOpen={isImageDetailsModalOpen}
          onClose={closeImageDetailsModal}
          character={characters[selectedItem]}
          aria-label={`Details for ${characters[selectedItem]?.name}`}
        />
      )}
    </>
  );
};

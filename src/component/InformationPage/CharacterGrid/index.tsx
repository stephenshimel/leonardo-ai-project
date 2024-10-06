import React, { useState, useCallback } from "react";
import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

import { ImageDetailsModal } from "../../modal/ImageDetailsModal";
import { GET_CHARACTERS } from "@/src/apollo/query/getCharacters";
import type {
  GetCharacters,
  GetCharactersQueryVariables,
} from "@/src/apollo/types/types";
import InformationPageSkeleton from "../../Loading/InformationPageSkeleton";
import { CharacterCard } from "./CharacterCard";
import { containerStyles, gridStyles } from "./styles";
import { isValidPageNumber } from "@/src/util/util";
import { InformationPageError } from "../Error/InformationPageError";

interface CharacterGridProps {
  page?: number;
  hasUserInfo: boolean;
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({
  page = NaN,
  hasUserInfo,
}) => {
  const [selectedItem, setSelectedItem] = useState<number | undefined>();
  const characterName = "rick"; // Move this to a constant or prop if it doesn't change

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

  const { data, loading, error } = useQuery<
    GetCharacters,
    GetCharactersQueryVariables
  >(GET_CHARACTERS, {
    variables: { name: characterName, page },
    skip: !hasUserInfo || !isValidPageNumber(page),
  });
  if (loading) return <InformationPageSkeleton />;

  if (error) return <InformationPageError />;

  const characters = data?.characters.results || [];

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

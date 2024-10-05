import React, { useState } from "react";
import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

import { ImageDetailsModal } from "../../modal/ImageDetailsModal";
import { GET_CHARACTERS } from "@/src/apollo/query/getCharacters";
import type {
  GetCharacters,
  GetCharactersQueryVariables,
} from "@/src/apollo/types/types";
import InformationPageError from "../Error/InformationPageError";
import InformationPageSkeleton from "../../Loading/InformationPageSkeleton";
import { CharacterCard } from "../CharacterCard";
import { containerStyles, gridStyles } from "./styles";
import { UserInfo } from "@/src/component/Header";
import { isValidPageNumber } from "@/src/util/util";

interface CharacterGridProps {
  page?: number;
  userInfo?: UserInfo;
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({
  page = NaN,
  userInfo,
}) => {
  const [selectedItem, setSelectedItem] = useState<number | undefined>();
  const [characterName] = useState("rick");

  const {
    isOpen: isImageDetailsModalOpen,
    onOpen: openImageDetailsModal,
    onClose: closeImageDetailsModal,
  } = useDisclosure();

  const handleClickItem = (item: number) => {
    setSelectedItem(item);
    openImageDetailsModal();
  };

  const { data, loading, error } = useQuery<
    GetCharacters,
    GetCharactersQueryVariables
  >(GET_CHARACTERS, {
    // TODO: make numbers of cards on each page take full width on last row
    variables: { name: characterName, page },
    skip: userInfo === undefined || !isValidPageNumber(page),
  });

  if (loading) return <InformationPageSkeleton />;
  if (error) return <InformationPageError error={error} />;

  const characters = data?.characters.results || [];

  return (
    <>
      <Box {...containerStyles}>
        <Grid {...gridStyles}>
          {characters.map((character, index) => (
            <CharacterCard
              key={index}
              name={character.name}
              image={character.image}
              onClick={() => handleClickItem(index)}
            />
          ))}
        </Grid>
      </Box>

      {selectedItem !== undefined && (
        <ImageDetailsModal
          isOpen={isImageDetailsModalOpen}
          onClose={closeImageDetailsModal}
          character={characters[selectedItem]}
        />
      )}
    </>
  );
};

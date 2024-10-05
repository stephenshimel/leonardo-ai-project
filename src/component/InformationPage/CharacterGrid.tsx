import React, { useState } from "react";
import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

import { ImageDetailsModal } from "../modal/ImageDetailsModal";
import { GET_CHARACTERS } from "@/src/apollo/query/getCharacters";
import type {
  GetCharacters,
  GetCharactersQueryVariables,
} from "@/src/apollo/types/types";
import InformationPageError from "./Error/InformationPageError";
import InformationPageSkeleton from "../Loading/InformationPageSkeleton";
import { CharacterCard } from "./CharacterGrid/CharacterCard";
import { UserInfo } from "@/src/component/Header";
interface CharacterGridProps {
  page: number;
  userInfo?: UserInfo;
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({
  page,
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
    skip: userInfo === undefined,
  });

  if (loading) return <InformationPageSkeleton />;
  if (error) return <InformationPageError error={error} />;

  const characters = data?.characters.results || [];

  return (
    <>
      {/* TODO: seperate css code */}
      <Box p={8}>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(6, 1fr)",
          }}
          gap={6}
        >
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

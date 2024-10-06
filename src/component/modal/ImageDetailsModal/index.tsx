import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Character } from "@/src/apollo/types/types";
import { modalContentStyles, imageStyles, vStackStyles } from "./styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  character?: Character; // Allow null if no character is selected
}

export const ImageDetailsModal = ({
  isOpen,
  onClose,
  character,
}: ModalProps) => {
  if (!character) return null; // If no character is selected, don't render anything

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      aria-label={`Details for ${character.name}`}
    >
      <ModalOverlay />
      <ModalContent {...modalContentStyles}>
        <ModalHeader aria-label={`Character name: ${character.name}`}>
          {character.name}
        </ModalHeader>
        <ModalCloseButton aria-label="Close modal" />
        <ModalBody>
          {character.image && (
            <Image
              src={character.image}
              alt={character.name}
              {...imageStyles}
              aria-label={`Image of ${character.name}`}
            />
          )}
          <VStack {...vStackStyles}>
            <Text aria-label={`Character name: ${character.name}`}>
              <strong>Name:</strong> {character.name}
            </Text>
            <Text aria-label={`Character location: ${character.location.name}`}>
              <strong>Location:</strong> {character.location.name}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

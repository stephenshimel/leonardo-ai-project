import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Image, Text } from '@chakra-ui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: {
    name: string;
    image: string;
  } | null; // Allow null if no character is selected
}

export const CustomizedModal = ({ isOpen, onClose, character }: ModalProps) => {
  if (!character) return null; // If no character is selected, don't render anything

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{character.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {character.image && <Image src={character.image} alt={character.name} />}
          <Text mt={4}>{character.name}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};


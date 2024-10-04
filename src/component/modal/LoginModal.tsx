import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

// Define schema for validation using Yup
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  jobTitle: yup.string().required("Job title is required"),
});

interface LoginModal {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { username: string; jobTitle: string }) => void;
  defaultValues?: { username: string; jobTitle: string };
}

const LoginModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: LoginModal) => {
  const toast = useToast();

  // Initialize form with React Hook Form and Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  // Reset form with default values when opening the modal
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (data: { username: string; jobTitle: string }) => {
    onSubmit(data);
    toast({
      title: "User information saved.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay backdropFilter="blur(50px)" />
      <ModalContent maxWidth="90%" width="400px">
        <ModalHeader>Enter User Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormControl mb={4} isInvalid={!!errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                {...register("username")}
                placeholder="Enter your username"
              />
              {errors.username && (
                <FormErrorMessage>{errors.username.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mb={4} isInvalid={!!errors.jobTitle}>
              <FormLabel>Job Title</FormLabel>
              <Input
                {...register("jobTitle")}
                placeholder="Enter your job title"
              />
              {errors.jobTitle && (
                <FormErrorMessage>{errors.jobTitle.message}</FormErrorMessage>
              )}
            </FormControl>

            <Button colorScheme="teal" type="submit" width="full">
              Save
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;

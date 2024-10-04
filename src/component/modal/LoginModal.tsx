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
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { UserInfo } from "../Header";
import { schema } from "@/src/validation/schema";

interface LoginModal {
  userInfo?: UserInfo;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { username: string; jobTitle: string }) => void;
  defaultValues?: { username: string; jobTitle: string };
}

const LoginModal = ({ userInfo, isOpen, onClose, onSubmit }: LoginModal) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: userInfo,
  });

  useEffect(() => {
    if (userInfo) {
      reset(userInfo);
    }
  }, [userInfo, reset]);

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

  const handleClose = () => {
    if (userInfo !== undefined) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="lg">
      <ModalOverlay backdropFilter="blur(50px)" />
      <ModalContent maxWidth="90%" width="500px" p={8}>
        <ModalHeader>Enter User Information</ModalHeader>
        {userInfo && <ModalCloseButton />}
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

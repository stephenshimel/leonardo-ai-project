import React from "react";
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
import { UserInfo } from "../../Header";
import { schema } from "@/src/validation/schema";
import {
  modalContentStyles,
  formControlStyles,
  submitButtonStyles,
} from "./styles";

interface LoginModal {
  userInfo?: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ userInfo, setUserInfo, isOpen, onClose }: LoginModal) => {
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
    if (isOpen) {
      reset(userInfo);
    }
  }, [isOpen, userInfo, reset]);

  const handleFormSubmit = (data: { username: string; jobTitle: string }) => {
    setUserInfo(data);
    toast({
      title: "User information saved.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  const handleClose = () => {
    // when userInfo is undefined, user is not allowed to manually close the modal
    if (userInfo !== undefined) {
      reset(userInfo); // discard unsaved change
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="lg">
      <ModalOverlay backdropFilter="blur(50px)" />
      <ModalContent {...modalContentStyles}>
        <ModalHeader>Enter User Information</ModalHeader>
        {userInfo && <ModalCloseButton />}
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormControl {...formControlStyles} isInvalid={!!errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                {...register("username")}
                placeholder="Enter your username"
              />
              {errors.username && (
                <FormErrorMessage>{errors.username.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl {...formControlStyles} isInvalid={!!errors.jobTitle}>
              <FormLabel>Job Title</FormLabel>
              <Input
                {...register("jobTitle")}
                placeholder="Enter your job title"
              />
              {errors.jobTitle && (
                <FormErrorMessage>{errors.jobTitle.message}</FormErrorMessage>
              )}
            </FormControl>

            <Button
              colorScheme="teal"
              type="submit"
              width="full"
              {...submitButtonStyles}
            >
              Save
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;

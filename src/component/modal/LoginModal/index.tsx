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
import { schema } from "@/src/validation/schema";
import { UserInfo } from "../../types";
import {
  modalContentStyles,
  formControlStyles,
  submitButtonStyles,
} from "./styles";

type LoginModalProps = {
  userInfo?: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({
  userInfo,
  setUserInfo,
  isOpen,
  onClose,
}: LoginModalProps) => {
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
        {userInfo && <ModalCloseButton aria-label="Close modal" />}
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormControl {...formControlStyles} isInvalid={!!errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                {...register("username")}
                placeholder="Enter your username"
                aria-label="Username input"
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
                aria-label="Job title input"
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
              aria-label="Save user information"
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

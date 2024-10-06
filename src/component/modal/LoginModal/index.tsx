import React, { useEffect, useCallback } from "react";
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
import { schema } from "@/src/validation/schema";
import {
  modalContentStyles,
  formControlStyles,
  submitButtonStyles,
} from "./styles";
import { FormData, formDataKeys, LoginModalProps } from "./types";
import { fieldLabels, fieldPlaceholders } from "./const";

export const LoginModal: React.FC<LoginModalProps> = ({
  userInfo,
  setUserInfo,
  isOpen,
  onClose,
}) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: userInfo,
  });

  useEffect(() => {
    if (isOpen) {
      reset(userInfo);
    }
  }, [isOpen, userInfo, reset]);

  const handleFormSubmit = useCallback(
    (data: FormData) => {
      setUserInfo(data);
      toast({
        title: "User information saved.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    },
    [setUserInfo, toast, onClose],
  );

  const handleClose = useCallback(() => {
    // when userInfo is undefined, user is not allowed to manually close the modal
    if (userInfo !== undefined) {
      reset(userInfo);
      onClose();
    }
  }, [userInfo, reset, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="lg">
      <ModalOverlay backdropFilter="blur(50px)" />
      <ModalContent {...modalContentStyles}>
        <ModalHeader>Enter User Information</ModalHeader>
        {userInfo && <ModalCloseButton aria-label="Close modal" />}

        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            {formDataKeys.map((field) => (
              <FormControl
                key={field}
                {...formControlStyles}
                isInvalid={!!errors[field]}
              >
                <FormLabel>{fieldLabels[field]}</FormLabel>
                <Input
                  {...register(field)}
                  placeholder={fieldPlaceholders[field]}
                  aria-label={`${fieldLabels[field]} input`}
                />
                {errors[field] && (
                  <FormErrorMessage>{errors[field].message}</FormErrorMessage>
                )}
              </FormControl>
            ))}

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

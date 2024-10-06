import { ModalContentProps } from "@chakra-ui/react";

export const modalContentStyles: ModalContentProps = {
  maxWidth: "90%",
  width: "450px",
  padding: "24px",
  margin: "auto", // This centers the modal horizontally
};

export const imageStyles = {
  width: "100%",
  height: "auto",
  objectFit: "cover" as const,
};

export const vStackStyles = {
  mt: 6,
  align: "start" as const,
  spacing: 3,
};

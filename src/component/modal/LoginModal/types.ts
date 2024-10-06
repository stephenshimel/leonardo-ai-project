import { UserInfo } from "../../types";

export type FormData = {
  username: string;
  jobTitle: string;
};

// Get keys of FormData as an array
export const formDataKeys: Array<keyof FormData> = ["username", "jobTitle"];

export type LoginModalProps = {
  userInfo?: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  isOpen: boolean;
  onClose: () => void;
};

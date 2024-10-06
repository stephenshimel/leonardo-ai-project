import { FormData } from "./types";

export const fieldLabels: Record<keyof FormData, string> = {
  username: "Username",
  jobTitle: "Job Title",
};

export const fieldPlaceholders: Record<keyof FormData, string> = {
  username: "Enter your username",
  jobTitle: "Enter your job title",
};

import * as yup from "yup";

export const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .max(50, "Username must be at most 50 characters"),
  jobTitle: yup
    .string()
    .required("Job title is required")
    .max(50, "Job title must be at most 100 characters"),
});

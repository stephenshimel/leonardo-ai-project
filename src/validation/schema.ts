import * as yup from "yup";

export const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  jobTitle: yup.string().required("Job title is required"),
});

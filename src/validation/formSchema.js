import * as yup from "yup";

export default yup.object().shape({
  username: yup
    .string()
    .required("username is required")
    .min(3, "username must be 3 chars long"),
  email: yup
    .string()
    .email("Must be valid email address")
    .required("Must include email address"),
  civil: yup
    .string()
    .oneOf(["married", "single"], "Relationship status please"),
  role: yup
    .string()
    .oneOf(["tl", "instructor", "alumni, ", "student"], "role is required"),
  // we are done with checkboxes
  hiking: yup.boolean(),
  reading: yup.boolean(),
  coding: yup.boolean(),
});
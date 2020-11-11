import * as yup from "yup";

export default yup.object().shape({
  fname: yup
    .string()
    .required("Enter your first name")
    .min(1, "first name must be at least 1 char"),
    lname: yup
    .string()
    .required("Enter your last name")
    .min(1, "last name must be at least 1 char"),
  email: yup
    .string()
    .email("Must be valid email address")
    .required("Must include email address"),
  password: yup
    .string()
    .required("Enter a password")
    .min(6, "password must be at least 6 characters long"),
  TOS: yup.boolean()
    .oneOf([true], "You must accept Terms and Conditions"),
});
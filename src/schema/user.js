import { object, string } from "yup"

export const userSchema = object({
  fullName: string("")
    .trim()
    .required("fullName is required"),
  email: string()
    .required("Email is required")
    .email("email must be an valid emaill address")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ),
  password: string()
    .required("password is required")
    .min(8, "password must be at least 8 characters"),
})
import { object, string } from "yup"

export const loginSchema = object({
  email: string("")
    .required("Email is required"),
  password: string("")
    .required("Password is required"),
})

export const registerSchema = object({
  firstName: string("")
    .required("FirstName is required"),
  lastName: string("")
    .required("LastName is required"),
  email: string("")
    .required("Email is required"),
  password: string("")
    .min(8, "Password must be at least 8 charecters")
    .required("Password is required")
})
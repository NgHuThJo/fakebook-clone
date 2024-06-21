import { body } from "express-validator";

export function validateInput(formFieldName: string) {
  const fieldMinLength = 8;

  return body(formFieldName)
    .trim()
    .isLength({ min: fieldMinLength })
    .withMessage(
      `${formFieldName} must have at least ${fieldMinLength} characters`
    )
    .escape();
}

export function validateEmail(emailFieldName: string) {
  return body(emailFieldName)
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .escape();
}

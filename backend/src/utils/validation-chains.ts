import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

const fieldMinLength = 8;

export const validateInput = (formFieldName: string) =>
  body(formFieldName)
    .trim()
    .isLength({ min: fieldMinLength })
    .withMessage(
      `Field "${formFieldName}" must have at least ${fieldMinLength} characters`
    )
    .escape();

export const validateEmail = (emailFieldName: string) =>
  body(emailFieldName)
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .escape();

export const handleValidationErrors = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsObject: Record<string, string> = {};

    errors.array().forEach((error) => {
      if (error.type === "field") {
        errorsObject[error.path] = error.msg;
      }
    });

    res.status(400).json({
      ...errorsObject,
    });
    return;
  }

  next();
});

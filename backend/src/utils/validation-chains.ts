import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const fieldMinLength = 8;

export function validateInput(formFieldName: string) {
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

export function handleValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsObject: Record<string, string> = {};

    errors.array().forEach((error) => {
      if (error.type === "field") {
        errorsObject[error.path] = error.msg;
      }
    });

    return res.status(400).json({
      ...errorsObject,
    });
  }

  next();
}

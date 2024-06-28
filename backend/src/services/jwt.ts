import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const verifyJWT: RequestHandler = (req, res, next) => {
  try {
    const cookies = req.headers.cookie;

    if (!cookies) {
      console.error("No cookies found");
      res.status(400).json({
        message: "No cookies found",
      });
      return;
    }

    const token = cookies
      .split(";")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.error("No JWT token in cookie found");
      res.status(400).json({
        message: "No JWT token in cookie found",
      });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("Decoded token:", decodedToken);

    req.user = decodedToken;

    next();
  } catch (err) {
    switch ((err as Error).name) {
      case "TokenExpiredError": {
        console.error("Token has expired");
        break;
      }
      case "JsonWebTokenError": {
        console.error("Invalid token");
        break;
      }
      default: {
        console.error("Error verifying token:", (err as Error).message);
      }
    }
  }
};

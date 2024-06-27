import jwt from "jsonwebtoken";

export function verifyJWT(token: string) {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token:", decodedToken);

    return decodedToken;
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
}

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  http.post("/api/login", () => {
    return HttpResponse.json({
      message: "Login successful",
      token: "JWT",
    });
  }),
  http.post("/api/signup", () => {
    return HttpResponse.json({
      message: "Success",
    });
  }),
];

export const server = setupServer(...handlers);

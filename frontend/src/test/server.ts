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
  http.get("/api/profile/feeds", () => {
    return HttpResponse.json([
      {
        post: {
          author: {
            username: "username",
            email: "email",
          },
          post: "randomPost",
          title: "randomTitle",
          likesCount: 0,
          created: Date.now(),
        },
        imgUrl: "randomUrl",
      },
    ]);
  }),
  http.get("/api/profile/users", () => {
    return HttpResponse.json([
      {
        username: "John Doe",
        email: "randomEmail@gmail.com",
        avatarUrl: "randomUrl",
      },
    ]);
  }),
];

export const server = setupServer(...handlers);

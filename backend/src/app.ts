// Third party
import cors from "cors";
import debug from "debug";
import express from "express";
import { main } from "@/config/mongo-prod-server.js";
// import MongoStore from "connect-mongo";
// import passport from "passport";
// import session from "express-session";
// import { createProxyMiddleware } from "http-proxy-middleware";
// Passport
// import { setupLocalStrategy } from "@/services/passport-strategies.js";
// Routers
import apiRouter from "@/routes/api.js";

// Entry point setup
const logger = debug("chat:app");
const app = express();
const port = process.env.PORT || 3000;

// App setup
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

main().catch((err: Error) => {
  logger(err);
});

// Non-route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.PROXY_URL,
    credentials: true,
  })
);
// Authentication
// setupLocalStrategy();
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 24 * 60 * 60 * 1000,
//     },
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URL,
//       autoRemove: "native",
//     }),
//   })
// );
// app.use(passport.session());

// Routes
app.use("/api", apiRouter);

// For debugging purposes
// app.use((req, res, next) => {
//   console.log("session object: ", req.session);
//   console.log("authenticated user object: ", req.user);
//   next();
// });

// Proxy for initial GET request to Express server for React app
// app.use(
//   "/",
//   createProxyMiddleware({
//     target: process.env.PROXY_URL,
//     changeOrigin: true,
//   })
// );

import bcryptjs from "bcryptjs";
import debug from "debug";
import LocalStrategy from "passport-local";
import passport from "passport";
import User from "../models/user.js";

const logger = debug("blog-api:passport");

type Done = (
  error: object | null,
  user?: object | boolean,
  message?: object
) => Done;

export function setupLocalStrategy() {
  const strategy: Done = new LocalStrategy(
    async (username: string, password: string, done: Done) => {
      try {
        const user = await User.findOne({ username: username }).exec();

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        const doesPasswordMatch = await bcryptjs.compare(
          password,
          user.password
        );

        if (!doesPasswordMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        if (err instanceof Error) {
          done(err);
        }
      }
    }
  );

  // Serializer and deserializer
  passport.serializeUser((user, done: Done) => {
    // user.id is builtin virtual getter for _id field
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done: Done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err as Error);
    }
  });

  // Add strategy to passport
  passport.use(strategy);
}

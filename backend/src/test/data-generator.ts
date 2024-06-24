import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

export const generateUser = () => {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const fullName = firstName.concat(" ", lastName);
  const email = faker.internet.email({
    firstName,
    lastName,
  });

  return {
    username: fullName,
    password: faker.internet.password(),
    email,
    avatarUrl: faker.image.avatar(),
  };
};

export const generateFeed = () => {
  return {
    author: new mongoose.Types.ObjectId(),
    created: faker.date.recent(),
    imgUrl: faker.image.urlLoremFlickr(),
  };
};

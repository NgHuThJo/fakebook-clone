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

export const generateFeed = () => {};

// export const generateStory = () => {
//   return {
//     imgUrl: faker.image.urlLoremFlickr(),
//   };
// };

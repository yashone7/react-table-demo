import { faker } from "@faker-js/faker";

const generateFakeData = (rowCount) => {
  const data = [];
  for (let i = 0; i < rowCount; i++) {
    data.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 80 }),
      visits: faker.number.int({ min: 1, max: 100 }),
      status: faker.helpers.arrayElement(["Active", "Inactive", "Pending"]),
      progress: faker.number.int({ min: 0, max: 100 }),
    });
  }
  return data;
};

export default generateFakeData;

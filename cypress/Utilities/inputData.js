const { faker } = require("@faker-js/faker");

const inputValues = {
  validInvestmentAmount: faker.number.int({ min: 1000, max: 1000000 }),
  maxInvestmentAmount: faker.number.int({ min: 1, max: 999 }),
  minInvestmentAmount: faker.number.int({ min: 1000001, max: 9999999 }),
};

export default inputValues;

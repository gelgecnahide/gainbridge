import * as productDetails from "../fixtures/productPage.json";
import inputValues from "../Utilities/inputData";

const [
  mainHeading,
  headings,
  paragaraph,
  investmentRates,sliderValue
] = Object.values(productDetails);

const labelHeadings = Object.values(headings);
const [threeYrsRate, fourYrsRate, fiveYrsRate] = Object.values(investmentRates);
const validInvestmentAmount = inputValues.validInvestmentAmount;
const minInvestmentAmount = inputValues.minInvestmentAmount;
const maxInvestmentAmount = inputValues.maxInvestmentAmount;
let durationValue;

describe("GainBridge Application", () => {
  beforeEach("login", () => {
    cy.visit(Cypress.config("baseUrl"));
  });

  it("verification of product selection page elements", () => {
    cy.verifyHeading(mainHeading);
    cy.verifyParagraph(paragaraph);
    cy.verifyBackButtonIsDisplayed();
    for (let heading of labelHeadings) {
      cy.verifyLabelHeading(heading);
    }
    cy.verifyInvestmentAmountInputElement();
    cy.slideLabelValue();
    cy.verifyRateAndDuration(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate
    );
    cy.verifyButtonElement();
  });

  it("validating the projected account with default value", () => {
    cy.enterInvestmentAmount(validInvestmentAmount);
    cy.slideLabelValue();
    cy.addDurationandVerifyRate(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate,
      validInvestmentAmount
    );
    cy.get("@projectedValue").then((projectedValue) => {
      cy.verifyProjectedValue(projectedValue);
    });
  });

  it("validate the projected account value with minimum acceptable values", () => {
    cy.enterInvestmentAmount(minInvestmentAmount);
    cy.slideLabelValue();
    cy.verifyRateAndDuration(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate
    );
    cy.verifyEmptyProjectedValue();
  });

  it("validate the projected account value with maximum acceptable values", () => {
    cy.enterInvestmentAmount(maxInvestmentAmount);
    cy.slideLabelValue();
    cy.verifyRateAndDuration(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate
    );
    cy.verifyEmptyProjectedValue();
  });

  it("validate the project account value with time duration 10 years", () => {
    cy.enterInvestmentAmount(validInvestmentAmount);
    cy.slider();
    cy.slideLabelValue();
    cy.addDurationandVerifyRate(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate,
      validInvestmentAmount
    );
    cy.get("@projectedValue").then((projectedValue) => {
      cy.verifyProjectedValue(projectedValue);
    });
  });

  it("validate the project account value with duration 5 years", () => {
    cy.enterInvestmentAmount(validInvestmentAmount);
    cy.setSliderValue(sliderValue);
    cy.slideLabelValue();
    cy.addDurationandVerifyRate(
      durationValue,
      threeYrsRate,
      fourYrsRate,
      fiveYrsRate,
      validInvestmentAmount
    );
    cy.get("@projectedValue").then((projectedValue) => {
      cy.verifyProjectedValue(projectedValue);
    });

  });
});

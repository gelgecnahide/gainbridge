import { calculateProjectedAmount } from "../Utilities/projectedValueFunc";
let amountValue;

//locator
const backButton = "#navbar-back-button";
const mainHeading = ".text-headline-7";
const investmentAmount = "#investment-amount";
const investmentRate = "#interest-rate";
const investmentDurationLabel = "[for='investment-duration']";
const investmentDurationScrollValue = "[aria-label='Volume'] div";
const investmentDurationScroll = "[data-testid='investment-duration']";
const investmentDurationSlider = "span[role='slider']";
const purchaseButton = "#purchase-button";
const labelElement = ".font-medium";
const paragraph = ".text-subhead-small";
const projectedValue = '[data-testid="projected-value"]';
const investmentScrollLabel = "span[role='slider'] div";

//methods
Cypress.Commands.add("slider", (value) => {
  cy.get(investmentDurationSlider).type("{shift}{rightArrow}");
});

Cypress.Commands.add("slideLabelValue", () => {
  cy.get(investmentScrollLabel)
    .invoke("text")
    .then((val) => {
      cy.wrap(val).as("slideDuration");
    });
});

Cypress.Commands.add("verifyBackButtonIsDisplayed", () => {
  cy.get(backButton).should("be.exist");
});

Cypress.Commands.add("verifyHeading", (heading) => {
  cy.get(mainHeading).contains(heading).should("be.visible");
});

Cypress.Commands.add("verifyParagraph", (paragraphText) => {
  cy.get(paragraph).should("be.visible").should("have.text", paragraphText);
});

Cypress.Commands.add("verifyInvestmentAmountInputElement", () => {
  cy.get(investmentAmount).should("be.visible");
});

Cypress.Commands.add(
  "verifyDefaultInvestmentRate",
  (duration, threeYrsRate, fourYrsRate, fiveYrsRate) => {
    cy.get(investmentRate)
      .should("be.visible")
      .invoke("val")
      .as(investmentRate)
      .then((value) => {
        if (duration == 3) {
          expect(value).to.equal(threeYrsRate);
        } else if (duration == 4) {
          expect(value).to.equal(fourYrsRate);
        } else {
          expect(value).to.equal(fiveYrsRate);
        }
      });
  }
);

Cypress.Commands.add("verifyDefaultInvestmentDuration", (duration) => {
  cy.get(investmentDurationLabel).should("be.visible");
  cy.get(investmentDurationSlider).should("be.visible");
  cy.get(investmentDurationScrollValue)
    .should("be.visible")
    .should("have.text", duration);
});

Cypress.Commands.add("verifyLabelHeading", (label) => {
  cy.get(labelElement).contains(label).should("be.visible");
});

Cypress.Commands.add("verifyButtonElement", () => {
  cy.get(purchaseButton).should("be.exist");
});

Cypress.Commands.add("enterInvestmentAmount", (amount) => {
  cy.get(investmentAmount)
    .should("be.visible")
    .clear()
    .type(amount)
    .should("contain.value", amount);
  cy.waitForProjectedValue();
  cy.get(investmentAmount)
    .invoke("attr", "value")
    .then((val) => {
      amountValue = val;
    });
  cy.waitForProjectedValue();
  cy.get("body").click();
});

Cypress.Commands.add(
  "getInvestmentRate",
  (duration, threeYrsRate, fourYrsRate, fiveYrsRate) => {
    cy.get(investmentRate)
      .should("be.visible")
      .invoke("val")
      .as(investmentRate)
      .then((value) => {
        if (duration == 3) {
          expect(value).to.equal(threeYrsRate);
        } else if (duration == 4) {
          expect(value).to.equal(fourYrsRate);
        } else {
          expect(value).to.equal(fiveYrsRate);
        }
        cy.wrap(value.replace("%", "").trim()).as("investmentRateInString");
      });
  }
);

Cypress.Commands.add(
  "calculateProjectedAccountValue",
  (amount, rate, duration) => {
    const calculatedValue = calculateProjectedAmount(amount, rate, duration);
    const val = calculatedValue.toFixed(2);
    cy.wrap(val).as("projectedValue");
  }
);

Cypress.Commands.add("verifyProjectedValue", (value) => {
  cy.waitForProjectedValue();
  cy.get(projectedValue)
    .invoke("text")
    .then((val) => {
      const projValue = parseFloat(val.replace(/\$|,/g, ""));
      const expectedValue = value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      assert.equal(projValue, parseFloat(expectedValue.replace(/\$|,/g, "")));
    });
});

Cypress.Commands.add("convertInvestmentRate", (rate) => {
  const rateValue = rate / 100;
  cy.wrap(rateValue).as("investmentRate");
});

Cypress.Commands.add("verifyEmptyProjectedValue", () => {
  cy.waitForProjectedValue();
  cy.get(projectedValue)
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      const projValue = text.replace(/\$|,/g, "").trim();
      assert.equal(projValue, "");
    });
});

Cypress.Commands.add(
  "verifyRateAndDuration",
  (durationValue, threeYrsRate, fourYrsRate, fiveYrsRate) => {
    cy.get("@slideDuration").then((val) => {
      cy.wrap(val).as("durationInYears");
    });
    cy.get("@durationInYears").then((val) => {
      durationValue = parseInt(val.match(/\d+/)[0], 10);
      cy.verifyDefaultInvestmentRate(
        durationValue,
        threeYrsRate,
        fourYrsRate,
        fiveYrsRate
      );
      cy.verifyDefaultInvestmentDuration(val);
    });
  }
);

Cypress.Commands.add(
  "addDurationandVerifyRate",
  (
    durationValue,
    threeYrsRate,
    fourYrsRate,
    fiveYrsRate,
    validInvestmentAmount
  ) => {
    cy.get("@slideDuration").then((val) => {
      cy.wrap(val).as("durationInYears");
    });
    cy.get("@durationInYears").then((val) => {
      durationValue = parseInt(val.match(/\d+/)[0], 10);
      cy.getInvestmentRate(
        durationValue,
        threeYrsRate,
        fourYrsRate,
        fiveYrsRate
      );
    });
    cy.get("@investmentRateInString").then((rate) => {
      cy.convertInvestmentRate(rate);
      cy.get("@investmentRate").then((investmentRate) => {
        cy.calculateProjectedAccountValue(
          validInvestmentAmount,
          investmentRate,
          durationValue
        );
      });
    });
  }
);

Cypress.Commands.add("setSliderValue", (value) => {
  cy.get(investmentDurationScroll).then(($slider) => {
    const sliderWidth = $slider.width();
    const min = 3;
    const max = 10;
    const range = max - min;
    const percentage = ((value - min) / range) * 100;
    const percentageIncrement = 14.2857;
    const decrementPerStep = 2.2857;
    const steps = percentage / percentageIncrement;
    const initialPixelOffset = 0;
    const pixelOffset = initialPixelOffset - steps * decrementPerStep;
    const position = (sliderWidth * percentage) / 100 + pixelOffset;
    const sliderOffset = $slider.offset().left;
    const pageX = sliderOffset + position;
    cy.wrap($slider).click(pageX, 0);
  });
});

Cypress.Commands.add("waitForProjectedValue", () => {
  cy.verifyInvestmentAmountInputElement();
  cy.verifyButtonElement();
  cy.waitUntil(() => cy.get(projectedValue).should("not.be.null"));
  cy.waitUntil(() => cy.get(projectedValue).should("not.have.text"));
  cy.verifyInvestmentAmountInputElement();
  cy.verifyButtonElement();
  cy.verifyInvestmentAmountInputElement();
  cy.verifyButtonElement();
  cy.verifyInvestmentAmountInputElement();
  cy.verifyButtonElement();
  cy.verifyInvestmentAmountInputElement();
  cy.verifyButtonElement();
});

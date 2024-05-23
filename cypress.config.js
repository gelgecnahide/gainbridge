const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "o51bwd",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://enrollment-2.gainbridge.io/product-selection/steadypace",
  },
});

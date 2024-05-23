# Prerequisites for Local
You must have Git installed. If you have Homebrew installed already, simply execute the following in the Terminal: brew install git. Otherwise, follow the official guide .
You must have NPM (Node Package Manager) installed. As above, you can use Homebrew: brew install node Otherwise, install it yourself. You may prefer using Visual Studio Code
# Cloning the Repository
Unless you just want to run the tests on Jenkins, you'll need to clone the repository to your machine. Once you have Git installed (as mentioned above), in a terminal, navigate to where you prefer to keep your repos. E.g., cd ~/MY/REPOS/PATH (wherever you prefer to keep your Git repositories on your local machine).

Note: If perchance you end up using GitHub Desktop (a GUI for Git/GitHub interactions), you may want to create a sub-directory named GitHub. So, for example, you might create a directory stucture like this: ~/Documents/Repos/GitHub With that as our example, perform the following:

cd ~/Documents/Repos/GitHub

# Install Cypress: 

```bash
npm install cypress --save-dev
```
# To open cypress to run the test
```bash
npx cypress open
```

# To run cypress test in headless mode and see the results on Cypress Dashboard

```bash
npx cypress run --record --key 9ee05944-af95-4faf-a21d-c13ab2845d2e
```

# Link to Cypress Dashboard

https://cloud.cypress.io/projects/o51bwd/runs

# Testing Approach

Functional Testing:
Investment Amount: Testing with boundary values ($1,000 and $1,000,000), invalid inputs (negative numbers, strings, special characters), and typical values.
Interest Rate (APY): Verify the input accepts valid percentage values, including boundary values and typical rates.
Investment Duration: Ensuring the slider works correctly for all possible durations (1 to 10 years) and verify the corresponding display changes accurately.

Usability Testing: 
Ensuring all elements (input fields, slider, buttons) are visible and accessible.
Verify that the slider is easy to use and accurately reflects the selected duration.
Checking that the "Purchase SteadyPace™" button is clickable and leads to the correct subsequent actions or pages.
Testing the layout on various devices and screen sizes to ensure that all elements are displayed properly and are usable.

Performance Testing:
Load Testing: Ensuring the calculator performs well under load, such as when multiple users are using it simultaneously.
Response Time: Measuring the time it takes for the projected account value to update after changing the input values.

Considerations:
Boundary Testing: Testing boundary values for the input fields to ensure the application handles edge cases correctly.
Error Handling:Checking how the application handles invalid inputs and whether appropriate error messages are displayed to guide the user.
Cross-Browser Compatibility: Testing the calculator on different browsers (Chrome, Firefox, Safari, Edge) to ensure consistent behavior and appearance.
User Experience: Calculator provides a seamless and intuitive experience, with clear instructions and feedback for the user.








const userName = "testuser";
const jobTitle = "Developer";

const login = () => {
  cy.get('input[name="username"]').type(userName);
  cy.get('input[name="jobTitle"]').type(jobTitle);
  cy.get('button[type="submit"]').click();
};

describe("Rick and Morty Character Gallery", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should redirect to information page and open login modal", () => {
    cy.url().should("eq", "http://localhost:3000/information?page=1");
    cy.get('[role="dialog"]').should("be.visible");
    cy.get('[role="dialog"]')
      .contains("Enter User Information")
      .should("exist");

    // Test that the modal cannot be closed by clicking outside
    cy.get("body").click(0, 0);
    cy.get('[role="dialog"]').should("be.visible");

    // Test that there is no close button
    cy.get('[role="dialog"]')
      .find('button[aria-label="Close"]')
      .should("not.exist");
  });

  it("should allow user to login and view character grid", () => {
    login();

    cy.get('[role="dialog"]').should("not.exist");
    cy.get(".chakra-toast")
      .should("be.visible")
      .and("contain", "User information saved");

    cy.contains("Rick Sanchez").should("exist").and("be.visible");

    // Check header contents
    cy.get("header").within(() => {
      cy.contains("Rick and Morty Gallery").should("exist");
      cy.contains(userName).should("exist");
      cy.contains(jobTitle).should("exist");
      cy.get("button").contains("Change User").should("exist");
    });

    // Check footer contents
    cy.get("button").contains("Previous").should("exist");
    cy.get("button").contains("Previous").should("be.disabled");
    cy.get("button").contains("Next").should("exist");
    cy.get("button").contains("Next").should("be.enabled");
  });

  it("should persist user information after page refresh", () => {
    login();

    // Check initial user information
    cy.contains(userName).should("exist");
    cy.contains(jobTitle).should("exist");

    // Refresh the page
    cy.reload();

    // Check if user information still exists after refresh
    cy.contains(userName).should("exist");
    cy.contains(jobTitle).should("exist");

    // Ensure character grid is still visible
    cy.contains("Rick Sanchez").should("exist").and("be.visible");
  });

  it("should allow pagination, and allow user to navigate by editing url", () => {
    // Login first
    login();

    // Test navigation
    cy.get("button").contains("Next").click();
    cy.url().should("include", "page=2");

    cy.get("button").contains("Previous").click();
    cy.url().should("include", "page=1");
    // Test navigation by editing URL
    cy.visit("http://localhost:3000/information/?page=2");
    cy.url().should("include", "page=2");
    cy.get("button").contains("Previous").should("be.enabled");

    // Verify content has changed
    cy.contains("Rick Sanchez").should("not.exist");

    // Test invalid page number
    cy.visit("http://localhost:3000/information/?page=-1");
    cy.url().should("include", "page=1");
    cy.visit("http://localhost:3000/information/?page=1.5");
    cy.url().should("include", "page=1");
    cy.visit("http://localhost:3000/information/?page=notNumber");
    cy.url().should("include", "page=1");
  });

  it("should allow changing user information", () => {
    login();

    // Initial check
    cy.contains("Rick and Morty Gallery").should("exist");
    cy.contains(userName).should("exist");
    cy.contains(jobTitle).should("exist");

    cy.get("button").contains("Change User").click();

    cy.get('[role="dialog"]').should("be.visible");

    const newUserName = "Morty Smith";
    const newJobTitle = "Sidekick";

    cy.get('input[name="username"]').clear().type(newUserName);
    cy.get('input[name="jobTitle"]').clear().type(newJobTitle);

    cy.get('button[type="submit"]').click();

    cy.get('[role="dialog"]').should("not.exist");

    cy.get(".chakra-toast")
      .should("be.visible")
      .and("contain", "User information saved");

    // Verify the new info is displayed in the header
    cy.contains("Rick and Morty Gallery").should("exist");
    cy.contains(newUserName).should("exist");
    cy.contains(newJobTitle).should("exist");
  });

  it("should handle errors gracefully", () => {
    cy.intercept("POST", "**/graphql", { forceNetworkError: true }).as(
      "graphqlError",
    );

    login();

    cy.wait("@graphqlError");
    cy.contains(
      "We're sorry, but there was an error retrieving the character information.",
    ).should("be.visible");
  });
});

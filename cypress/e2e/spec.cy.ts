describe("Rick and Morty Character Gallery", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
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
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="jobTitle"]').type("Developer");
    cy.get('button[type="submit"]').click();

    cy.get('[role="dialog"]').should("not.exist");
    cy.get(".chakra-toast")
      .should("be.visible")
      .and("contain", "User information saved");

    cy.get(".chakra-grid").should("be.visible");
    cy.get(".chakra-card").should("exist").and("be.visible");
    cy.get(".chakra-card").should("have.length.greaterThan", 0);
  });

  // it("should display character cards and allow navigation", () => {
  //   // Login first
  //   cy.get('input[name="username"]').type("testuser");
  //   cy.get('input[name="jobTitle"]').type("Developer");
  //   cy.get('button[type="submit"]').click();

  //   cy.get(".chakra-card").should("have.length.greaterThan", 0);
  //   cy.get(".chakra-card").first().click();
  //   cy.get('[role="dialog"]').should("be.visible");
  //   cy.get('[role="dialog"]').contains("Close").click();
  //   cy.get('[role="dialog"]').should("not.exist");

  //   cy.get("button").contains("Next").click();
  //   cy.url().should("include", "page=2");
  // });

  // it("should allow user to logout", () => {
  //   // Login first
  //   cy.get('input[name="username"]').type("testuser");
  //   cy.get('input[name="jobTitle"]').type("Developer");
  //   cy.get('button[type="submit"]').click();

  //   cy.get("button").contains("Logout").click();
  //   cy.get('[role="dialog"]').should("be.visible");
  //   cy.get('[role="dialog"]').contains("Login").should("exist");
  // });

  // it("should handle errors gracefully", () => {
  //   // Simulate a network error
  //   cy.intercept("POST", "**/graphql", { forceNetworkError: true }).as(
  //     "graphqlError",
  //   );

  //   // Login to trigger the query
  //   cy.get('input[name="username"]').type("testuser");
  //   cy.get('input[name="jobTitle"]').type("Developer");
  //   cy.get('button[type="submit"]').click();

  //   cy.wait("@graphqlError");
  //   cy.contains("An error occurred").should("be.visible");
  // });
});

describe("Users app", () => {
    beforeEach(() => {
        // arbitrary code you want running before your tests start: setup
        cy.visit("http://localhost:3000");
      });

    const fnameInput = () => cy.get("input[name='fname']");
    const lnameInput = () => cy.get("input[name='lname']");
    const emailInput = () => cy.get("input[name='email']");
    const passwordInput = () => cy.get("input[name='password']");
    const cbox = () => cy.get("input[name='TOS']");
    const submitButton = () => cy.get("#submitBtn");
    const newPostDisplay = () => cy.get("#newPost");
    const errorDiv = () => cy.get(".errors").children();

  it("sanity test to make sure tests work", () => {
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
  });

  it("checks functionality of name inputs", () => {
    fnameInput().should("have.value", "");
    lnameInput().should("have.value", "");
    fnameInput().type("george");
    lnameInput().type("bush");
    fnameInput().should("have.value", "george");
    lnameInput().should("have.value", "bush");
  });

  it("checks functionality of email and password inputs", () => {
    emailInput().should("have.value", "");
    passwordInput().should("have.value", "");
    emailInput().type("email@email.com");
    passwordInput().type("password123");
    emailInput().should("have.value", "email@email.com");
    passwordInput().should("have.value", "password123");
  });

  it("checks to see is user can select the checkbox", () => {
    cbox().should("not.be.checked");
    cbox().check();
    cbox().should("be.checked");
  });

  it("checks to see if submit button works", () => {
    submitButton().should("exist")
        .should("be.disabled");
    newPostDisplay().should("exist")
        .should("have.value", "");
    fnameInput().type("george");
    submitButton().should("be.disabled");
    lnameInput().type("bush");
    submitButton().should("be.disabled");
    emailInput().type("email@email.com");
    submitButton().should("be.disabled");
    passwordInput().type("password123");
    submitButton().should("be.disabled");
    cbox().check();
    submitButton().should("not.be.disabled");
    submitButton().click();
    fnameInput().should("have.value", "");
    lnameInput().should("have.value", "");
    emailInput().should("have.value", "");
    passwordInput().should("have.value", "");
    cbox().should("not.be.checked");
    submitButton().should("be.disabled");
    newPostDisplay().contains("george").contains("bush").contains("email@email.com");
  });

  it("checks for form validation if an input is left empty", () => {
    fnameInput().type("george");
    fnameInput().clear();
    errorDiv().should("exist").contains("Enter your first name");
    lnameInput().type("bush");
    lnameInput().clear();
    errorDiv().contains("Enter your last name");
    emailInput().type("email@email.com");
    emailInput().clear();
    errorDiv().contains("Must include email address");
    emailInput().type("email");
    errorDiv().contains("Must be valid email address");
    passwordInput().type("password123");
    passwordInput().clear();
    errorDiv().contains("Enter a password");
    passwordInput().type("pass");
    errorDiv().contains("Password must be at least 6 characters long");
    cbox().check();
    cbox().uncheck();
    errorDiv().contains("You must accept Terms and Conditions");
  });
});

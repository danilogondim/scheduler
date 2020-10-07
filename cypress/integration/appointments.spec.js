describe("Appointments", () => {

  beforeEach(() => {
    // 1. Reset the database to the original state
    cy.request("GET", "/api/debug/reset");

    // 2. Visits the root of our web server
    cy.visit("/");

    // 3. Confirms that the data has loaded
    cy.contains("Monday");
  });

  it("should book an interview", () => {

    // 1. Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click();

    // 2. Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // 3. Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // 4. Clicks the save button
    cy.contains("Save").click();

    // 5. Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {

    // 1. Clicks the edit button for the existing appointment
    cy.get("[alt=Edit]").click({ force: true });

    // 2. Changes the name and interviewer
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones")
    cy.get("[alt='Tori Malcolm']").click();

    // 3. Clicks the save button
    cy.contains("Save").click();

    // 4. Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // 1. Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]").click({ force: true });

    // 2. Clicks the confirm button
    cy.contains("Confirm").click();

    // 3. Confirms that the Deleting mode is showing
    cy.contains("Deleting").should("exist");

    // 4. Confirms that the Deleting mode is gone
    cy.contains("Deleting").should("not.exist");

    // 5. Confirms that the appointment with the original student name is gone
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
})
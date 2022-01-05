const faker = require("faker");

const driverEmail = faker.internet.email();
const driverFirstName = faker.name.firstName();
const driverLastName = faker.name.lastName();
const riderEmail = faker.internet.email();
const riderFirstName = faker.name.firstName();
const riderLastName = faker.name.lastName();

const tripResponse = [
  {
    id: "94fc5eba-de7a-44b2-8000-856ec824609d",
    created: "2020-08-18T21:41:08.112946Z",
    updated: "2020-08-18T21:41:08.112986Z",
    pick_up_address: "A",
    drop_off_address: "B",
    status: "STARTED",
    driver: {
      id: 113,
      photo: "http://localhost:8003/media/photos/photo_QI0TTYh.jpg",
    },
    rider: {
      id: 112,
      photo: "http://localhost:8003/media/photos/photo_r3XrvgH.jpg",
    },
  },
  {
    id: "94fc5eba-de7a-44b2-8000-856ec824609d",
    created: "2020-08-18T21:41:08.112946Z",
    updated: "2020-08-18T21:41:08.112986Z",
    pick_up_address: "A",
    drop_off_address: "B",
    status: "COMPLETED",
    driver: {
      id: 113,
      photo: "http://localhost:8003/media/photos/photo_QI0TTYh.jpg",
    },
    rider: {
      id: 112,
      photo: "http://localhost:8003/media/photos/photo_r3XrvgH.jpg",
    },
  },
];

describe("The rider dashboard", function () {
  // new
  before(function () {
    cy.addUser(riderEmail, riderFirstName, riderLastName, "rider");
    cy.addUser(driverEmail, driverFirstName, driverLastName, "driver");
  });

  it("Cannot be visited if the user is not a rider", function () {
    cy.intercept("POST", "log_in").as("logIn");

    cy.logIn(driverEmail); // new

    cy.visit("/#/rider");
    cy.hash().should("eq", "#/");
  });

  it("Can be visited if the user is a rider", function () {
    cy.intercept("POST", "log_in").as("logIn");

    cy.logIn(riderEmail); // new

    cy.visit("/#/rider");
    cy.hash().should("eq", "#/rider");
  });

  it("Displays messages for no trips", function () {
    cy.intercept("trip", {
      statusCode: 200,
      body: [],
    }).as("getTrips");

    cy.logIn(riderEmail);

    cy.visit("/#/rider");
    cy.wait("@getTrips");

    // Current trips.
    cy.get("[data-cy=trip-card]").eq(0).contains("No trips.");

    // Completed trips.
    cy.get("[data-cy=trip-card]").eq(1).contains("No trips.");
  });

  it("Displays current and completed trips", function () {
    cy.intercept("trip", {
      statusCode: 200,
      body: tripResponse,
    }).as("getTrips");

    cy.logIn(riderEmail);

    cy.visit("/#/rider");
    cy.wait("@getTrips");

    // Current trips.
    cy.get("[data-cy=trip-card]").eq(0).contains("STARTED");

    // Completed trips.
    cy.get("[data-cy=trip-card]").eq(1).contains("COMPLETED");
  });
});

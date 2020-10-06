import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});


/*
  About the Application Test Suite:
    We will mock the functions we use from the axios library.
    We will write a test to confirm that the scheduler can load data.
    We will write an asynchronous test that waits for a component to update before proceeding.
    We will use containers to find specific DOM nodes.
    We will chain promises to handle asynchronous testing.
    We will override mock implementations for specific tests.
    We will use setup and teardown functions provided by Jest to perform common tasks.
*/
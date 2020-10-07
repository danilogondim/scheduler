import React from "react";

import { render, cleanup, waitForElement, waitForElementToBeRemoved, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

// import our mock axios library just to be able to simulate errors. We will mock its behavior in the last two tests
import axios from 'axios';

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Search for all appointments in the original container by querying the test id and get the first element
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 4. Test that the saving works: click the add button, change the student name input, select an interviewer and click the save button.
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    // 5. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 6. Wait until the text "Lydia Miller-Jones" is displayed in our appointment element. The test if the student name is in the document is implicit
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // 7. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed (meaning the appointment was removed).
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Check that the form is shown (search for the Save button)
    expect(getByText(appointment, "Save")).toBeInTheDocument();

    // 5. change the student name (from "Archie Cohen" to "Lydia Miller-Jones") and the interviewer (from "Tori Malcolm" to "Sylvia Palmer"):
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 5. Click the "Save" button to edit the appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Wait until the element with the new student name is displayed.
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

  it("shows the save error when failing to save an appointment", async () => {
    // 1. Make sure that the first request to our axios mocked library will reject.
    axios.put.mockRejectedValueOnce();

    // 2. Render the Application
    const { container } = render(<Application />);

    // 3. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 4. search for an component that is empty by find an Add button
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByAltText(appointment, "Add")
    );

    // 5. Test that the saving does not work: click the add button, change the student name input, select an interviewer and click the save button.
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Confirm that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Check that the save has failed by waiting saving to disappear and confirming that the error msg is in our component
    await waitForElementToBeRemoved(() => queryByText(appointment, "Saving"));
    expect(getByText(appointment, "Could not save appointment.")).toBeInTheDocument();

    // 8. Press the close image and make sure that the error is not in the document and that the form is showing again
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(queryByText(appointment, "Error")).not.toBeInTheDocument();
    expect(getByText(appointment, "Save")).toBeInTheDocument();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // 1. Make sure that the first request to our axios mocked library will reject.
    axios.delete.mockRejectedValueOnce();

    // 2. Render the Application.
    const { container } = render(<Application />);

    // 3. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 4. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 5. Check that the confirmation message is shown.
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    // 6. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 7. Confirm that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 8. Check if the deletion has failed by waiting deleting to disappear and confirming that the error msg is in our component
    await waitForElementToBeRemoved(() => queryByText(appointment, "Deleting"));
    expect(getByText(appointment, "Could not delete appointment.")).toBeInTheDocument();

    // 9. Press the close image and make sure that the error is not in the document and that the form is showing again
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(queryByText(appointment, "Error")).not.toBeInTheDocument();
    expect(getByAltText(appointment, "Delete")).toBeInTheDocument();
  });
});
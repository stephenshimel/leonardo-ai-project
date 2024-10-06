import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InformationPageError } from "./InformationPageError";

describe("InformationPageError", () => {
  it("renders the error component", () => {
    render(<InformationPageError />);
    const errorComponent = screen.getByTestId("information-page-error");
    expect(errorComponent).toBeInTheDocument();
  });

  it("renders the error title", () => {
    render(<InformationPageError />);
    const errorTitle = screen.getByTestId("error-title");
    expect(errorTitle).toHaveTextContent("Error fetching data");
  });

  it("renders the error message", () => {
    render(<InformationPageError />);
    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toHaveTextContent(
      "We're sorry, but there was an error retrieving the character information.",
    );
  });
});

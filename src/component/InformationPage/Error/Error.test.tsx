import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InformationPageError from "./InformationPageError";

describe("InformationPageError", () => {
  it("renders the error title", () => {
    render(<InformationPageError error={new Error("Test error")} />);
    expect(screen.getByText("Error fetching data")).toBeInTheDocument();
  });

  it("renders the error message", () => {
    render(<InformationPageError error={new Error("Test error")} />);
    expect(
      screen.getByText(
        "We're sorry, but there was an error retrieving the character information.",
      ),
    ).toBeInTheDocument();
  });
});

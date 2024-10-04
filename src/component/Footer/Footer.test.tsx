import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "./index";
import { useRouter } from "next/router";

// Mock the useRouter hook
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Footer", () => {
  beforeEach(() => {
    // Set up a mock implementation for useRouter
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
      pathname: "/",
      query: {},
    }));
  });

  it("renders the footer buttons", () => {
    render(<Footer page={1} setPage={() => {}} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("disables the Previous button on the first page", () => {
    render(<Footer page={1} setPage={() => {}} />);
    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("enables the Previous button after the first page", () => {
    render(<Footer page={2} setPage={() => {}} />);
    const previousButton = screen.getByText("Previous");
    expect(previousButton).not.toBeDisabled();
  });

  it("always enables the Next button", () => {
    render(<Footer page={1} setPage={() => {}} />);
    const nextButton = screen.getByText("Next");
    expect(nextButton).not.toBeDisabled();
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./index";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Header", () => {
  let mockRouter: any;
  let mockOnChangeUser: jest.Mock;

  beforeEach(() => {
    mockRouter = {
      push: jest.fn(),
      pathname: "/",
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    mockOnChangeUser = jest.fn();

    jest.clearAllMocks();
  });

  it("renders the header with logo", () => {
    render(<Header />);
    expect(screen.getByText("Rick and Morty Gallery")).toBeInTheDocument();
  });

  it("renders user info when provided", () => {
    const userInfo = { username: "mockUsername", jobTitle: "mockjobTitle" };
    render(<Header userInfo={userInfo} onChangeUser={mockOnChangeUser} />);
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("mockUsername")).toBeInTheDocument();
    expect(screen.getByText("Job Title:")).toBeInTheDocument();
    expect(screen.getByText("mockjobTitle")).toBeInTheDocument();
  });

  it("does not render user info when not provided", () => {
    render(<Header onChangeUser={mockOnChangeUser} />);
    expect(screen.queryByText("Username:")).not.toBeInTheDocument();
    expect(screen.queryByText("Job Title:")).not.toBeInTheDocument();
  });

  it("renders Change User button", () => {
    render(<Header onChangeUser={mockOnChangeUser} />);
    expect(screen.getByText("Change User")).toBeInTheDocument();
  });

  it("calls onChangeUser when Change User button is clicked", () => {
    render(<Header onChangeUser={mockOnChangeUser} />);
    fireEvent.click(screen.getByText("Change User"));
    expect(mockOnChangeUser).toHaveBeenCalledTimes(1);
  });
});

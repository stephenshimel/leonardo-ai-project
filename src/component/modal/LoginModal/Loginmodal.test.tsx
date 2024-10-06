import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginModal from ".";
import { UserInfo } from "../../Header";

describe("LoginModal", () => {
  const mockOnClose = jest.fn();
  const mockSetUserInfo = jest.fn();

  const defaultUserInfo: UserInfo = {
    username: "testuser",
    jobTitle: "Developer",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal with user information form when open", () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={mockOnClose}
        setUserInfo={mockSetUserInfo}
      />,
    );

    expect(screen.getByText("Enter User Information")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Job Title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={mockOnClose}
        setUserInfo={mockSetUserInfo}
        userInfo={defaultUserInfo}
      />,
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls setUserInfo with username and jobTitle when form is submitted", async () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={mockOnClose}
        setUserInfo={mockSetUserInfo}
      />,
    );

    const usernameInput = screen.getByLabelText("Username");
    const jobTitleInput = screen.getByLabelText("Job Title");
    const saveButton = screen.getByRole("button", { name: "Save" });

    fireEvent.change(usernameInput, { target: { value: "newuser" } });
    fireEvent.change(jobTitleInput, { target: { value: "Designer" } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockSetUserInfo).toHaveBeenCalledTimes(1);
      expect(mockSetUserInfo).toHaveBeenCalledWith({
        username: "newuser",
        jobTitle: "Designer",
      });
    });
  });

  it("displays error messages when form is submitted with invalid data", async () => {
    render(
      <LoginModal
        isOpen={true}
        onClose={mockOnClose}
        setUserInfo={mockSetUserInfo}
      />,
    );

    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
      expect(screen.getByText("Job title is required")).toBeInTheDocument();
    });
  });
});

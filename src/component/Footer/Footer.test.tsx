import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "./index";
import { useRouter } from "next/router";
import * as util from "@/src/util/util";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/src/util/util", () => ({
  isValidPageNumber: jest.fn(),
  redirectToPage: jest.fn(),
}));

describe("Footer", () => {
  let mockRouter: any;
  let mockSetPage: jest.Mock;

  beforeEach(() => {
    mockRouter = {
      push: jest.fn(),
      pathname: "/",
      query: {},
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    mockSetPage = jest.fn();

    jest.clearAllMocks();
  });

  it("renders the footer buttons", () => {
    render(<Footer page={1} setPage={mockSetPage} totalPages={10} />);
    expect(
      screen.getByRole("button", { name: "Go to previous page" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Go to next page" }),
    ).toBeInTheDocument();
  });

  it("disables the Previous button on the first page", () => {
    render(<Footer page={1} setPage={mockSetPage} totalPages={10} />);
    expect(
      screen.getByRole("button", { name: "Go to previous page" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Go to next page" }),
    ).not.toBeDisabled();
  });

  it("enables the Previous button after the first page", () => {
    render(<Footer page={2} setPage={mockSetPage} totalPages={10} />);
    expect(
      screen.getByRole("button", { name: "Go to previous page" }),
    ).not.toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Go to next page" }),
    ).not.toBeDisabled();
  });

  it("calls handlePageChange with correct value when Previous button is clicked", () => {
    (util.isValidPageNumber as jest.Mock).mockReturnValue(true);
    render(<Footer page={2} setPage={mockSetPage} totalPages={10} />);

    fireEvent.click(screen.getByText("Previous"));

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: "/",
      query: { page: 1 },
    });
  });

  it("calls handlePageChange with correct value when Next button is clicked", () => {
    (util.isValidPageNumber as jest.Mock).mockReturnValue(true);
    render(<Footer page={2} setPage={mockSetPage} totalPages={10} />);

    fireEvent.click(screen.getByText("Next"));

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: "/",
      query: { page: 3 },
    });
  });

  it("doesn't render anything when page is undefined", () => {
    const { container } = render(
      <Footer setPage={mockSetPage} totalPages={10} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("updates page when router query changes", () => {
    mockRouter.query = { page: "3" };

    act(() => {
      render(<Footer page={2} setPage={mockSetPage} totalPages={10} />);
    });

    expect(mockSetPage).toHaveBeenCalledWith(3);
  });

  it("redirects to page 1 when invalid page number is in URL", () => {
    mockRouter.query = { page: "invalid" };
    (util.isValidPageNumber as jest.Mock).mockReturnValue(false);

    act(() => {
      render(<Footer page={2} setPage={mockSetPage} totalPages={10} />);
    });

    expect(util.redirectToPage).toHaveBeenCalledWith(mockRouter, 1);
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });
});

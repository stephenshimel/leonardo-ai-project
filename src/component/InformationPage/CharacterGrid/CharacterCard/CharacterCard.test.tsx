import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CharacterCard } from "./index";

describe("CharacterCard", () => {
  const mockProps = {
    name: "Rick Sanchez",
    image: "https://example.com/rick.jpg",
    onClick: jest.fn(),
  };

  it("renders the character name", () => {
    render(<CharacterCard {...mockProps} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("renders the character image", () => {
    render(<CharacterCard {...mockProps} />);
    const image = screen.getByAltText("Rick Sanchez");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/rick.jpg");
  });

  it("calls onClick when the card is clicked", () => {
    render(<CharacterCard {...mockProps} />);
    const card = screen.getByText("Rick Sanchez").closest("div");
    fireEvent.click(card as Element);
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ImageDetailsModal } from "./index";
import { Character } from "@/src/apollo/types/types";

describe("ImageDetailsModal", () => {
  const mockCharacter: Character = {
    id: "1",
    name: "Rick Sanchez",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    location: {
      id: "1",
      name: "Earth (Replacement Dimension)",
    },
  };

  const mockOnClose = jest.fn();

  it("renders the modal with character details when open", () => {
    render(
      <ImageDetailsModal
        isOpen
        onClose={mockOnClose}
        character={mockCharacter}
      />,
    );
    expect(screen.getAllByText(mockCharacter.name)).toHaveLength(2);
    expect(screen.getAllByAltText(mockCharacter.name)).toHaveLength(1);
    expect(screen.getAllByText(mockCharacter.name)).toHaveLength(2);
    expect(screen.getAllByText(mockCharacter.location.name)).toHaveLength(1);
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <ImageDetailsModal
        isOpen
        onClose={mockOnClose}
        character={mockCharacter}
      />,
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

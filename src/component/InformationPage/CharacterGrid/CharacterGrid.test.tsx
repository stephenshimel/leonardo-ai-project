import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { CharacterGrid } from "./index";
import { GET_CHARACTERS } from "@/src/apollo/query/getCharacters";
import "@testing-library/jest-dom";

const mockCharacters = [
  {
    id: "1",
    name: "Rick Sanchez",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    location: {
      id: "20",
      name: "Earth (Replacement Dimension)",
    },
  },
  {
    id: "2",
    name: "Morty Smith",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    location: {
      id: "20",
      name: "Earth (Replacement Dimension)",
    },
  },
];

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: { name: "rick", page: 1 },
    },
    result: {
      data: {
        characters: {
          results: mockCharacters,
        },
      },
    },
  },
];

describe("CharacterGrid", () => {
  it("renders loading state", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterGrid characters={[]} isLoading isError={false} />
      </MockedProvider>,
    );
    expect(screen.getByTestId("skeleton-container")).toBeInTheDocument();
  });

  it("renders characters when data is loaded", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterGrid
          characters={mockCharacters}
          isLoading={false}
          isError={false}
        />
      </MockedProvider>,
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });

  it("opens ImageDetailsModal when a character is clicked", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterGrid
          characters={mockCharacters}
          isLoading={false}
          isError={false}
        />
      </MockedProvider>,
    );

    const rickCard = screen.getByText("Rick Sanchez");
    fireEvent.click(rickCard);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText("Earth (Replacement Dimension)"),
    ).toBeInTheDocument();
  });

  it("renders error state when isError prop is true", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterGrid characters={[]} isLoading={false} isError />
      </MockedProvider>,
    );

    expect(screen.getByTestId("information-page-error")).toBeInTheDocument();
  });
});

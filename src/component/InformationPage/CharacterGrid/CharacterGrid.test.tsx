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
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
  },
  {
    id: "2",
    name: "Morty Smith",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
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
        <CharacterGrid
          page={1}
          userInfo={{ username: "test", jobTitle: "tester" }}
        />
      </MockedProvider>,
    );
    expect(screen.getByTestId("skeleton-container")).toBeInTheDocument();
  });

  it("renders characters when data is loaded", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterGrid
          page={1}
          userInfo={{ username: "test", jobTitle: "tester" }}
        />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    });
  });

  it("opens ImageDetailsModal when a character is clicked", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterGrid
          page={1}
          userInfo={{ username: "test", jobTitle: "tester" }}
        />
      </MockedProvider>,
    );

    await waitFor(() => {
      const rickCard = screen.getByText("Rick Sanchez");
      fireEvent.click(rickCard);
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("doesn't render when userInfo is undefined", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterGrid page={1} />
      </MockedProvider>,
    );

    expect(
      screen.queryByTestId("information-page-skeleton"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Rick Sanchez")).not.toBeInTheDocument();
  });

  it("doesn't render when page number is invalid", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterGrid
          page={0}
          userInfo={{ username: "test", jobTitle: "tester" }}
        />
      </MockedProvider>,
    );

    expect(
      screen.queryByTestId("information-page-skeleton"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Rick Sanchez")).not.toBeInTheDocument();
  });

  it("renders error state when query fails", async () => {
    const errorMock = [
      {
        request: {
          query: GET_CHARACTERS,
          variables: { name: "rick", page: 1 },
        },
        error: new Error("An error occurred"),
      },
    ];

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <CharacterGrid
          page={1}
          userInfo={{ username: "test", jobTitle: "tester" }}
        />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("information-page-error")).toBeInTheDocument();
    });
  });
});

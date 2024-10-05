import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InformationPageSkeleton from "./InformationPageSkeleton";

describe("InformationPageSkeleton", () => {
  it("renders the correct number of skeleton cards", () => {
    render(<InformationPageSkeleton />);
    const skeletonCards = screen.getAllByRole("article");
    expect(skeletonCards).toHaveLength(18);
  });

  it("renders skeleton images", () => {
    render(<InformationPageSkeleton />);
    const skeletonImages = screen.getAllByTestId("skeleton-image");
    expect(skeletonImages).toHaveLength(18);
  });

  it("renders skeleton text", () => {
    render(<InformationPageSkeleton />);
    const skeletonTexts = screen.getAllByTestId("skeleton-text");
    expect(skeletonTexts).toHaveLength(18);
  });
});

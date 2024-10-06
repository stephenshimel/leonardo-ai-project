import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InformationPageSkeleton from "./InformationPageSkeleton";

describe("InformationPageSkeleton", () => {
  it("renders the correct number of skeleton cards, images, and text", () => {
    render(<InformationPageSkeleton />);

    const skeletonCards = screen.getAllByRole("article");
    expect(skeletonCards).toHaveLength(20);

    const skeletonImages = screen.getAllByTestId("skeleton-image");
    expect(skeletonImages).toHaveLength(20);

    const skeletonTexts = screen.getAllByTestId("skeleton-text");
    expect(skeletonTexts).toHaveLength(20);
  });
});

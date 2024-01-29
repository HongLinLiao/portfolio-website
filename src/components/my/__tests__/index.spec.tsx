import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import My from "..";

describe("#My", () => {
  it('should render the name "Leo Liao" with correct styling', () => {
    const { getByRole } = render(<My />);
    const headerElement = getByRole("heading", { name: /leo liao/i });
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass("text-5xl font-bold");
  });
});

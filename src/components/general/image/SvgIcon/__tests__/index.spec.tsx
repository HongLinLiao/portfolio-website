import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SvgIcon from "..";

describe("SvgIcon component", () => {
  const mockOnClick = jest.fn();

  const renderComponent = (props = {}) => {
    return render(
      <SvgIcon icon={<span>Mock</span>} {...props} onClick={mockOnClick} />
    );
  };

  it("should render with the provided", () => {
    const { getByText } = renderComponent();
    const iconElement = getByText("Mock");
    expect(iconElement).toBeInTheDocument();
  });

  it("should render additional props", () => {
    const { container } = renderComponent({ className: "custom-class" });
    const buttonElement = container.querySelector("button");
    expect(buttonElement).toHaveClass("custom-class");
  });

  it("should trigger onClick when clicked", () => {
    const { container } = renderComponent();
    const buttonElement = container.querySelector("button");

    fireEvent.click(buttonElement!);

    expect(mockOnClick).toHaveBeenCalled();
  });
});

import { fireEvent, render } from "@testing-library/react";
import System from "../page";

describe("#System", () => {
  it("should render with default theme and theme options", () => {
    const { getByText, getByRole } = render(<System />);

    expect(getByText("Current Theme:")).toBeInTheDocument();
    expect(getByText("System")).toBeInTheDocument();

    const themeSelect = getByRole("combobox");
    expect(themeSelect).toHaveValue("system");
    expect(getByText("Dark")).toBeInTheDocument();
    expect(getByText("Light")).toBeInTheDocument();
  });

  it("should change theme when selected from select", () => {
    const { getByText, getByRole } = render(<System />);

    const themeSelect = getByRole("combobox");
    fireEvent.change(themeSelect, { target: { value: "dark" } });

    expect(themeSelect).toHaveValue("dark");
  });

  it("should render link component", () => {
    const { getByText } = render(<System />);

    const link = getByText("Home");
    expect(link).toBeInTheDocument();
  });
});

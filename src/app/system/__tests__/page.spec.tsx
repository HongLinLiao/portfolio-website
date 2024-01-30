import { fireEvent, render } from "@testing-library/react";
import System from "../page";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

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
    const { getByRole } = render(<System />);

    const themeSelect = getByRole("combobox");
    fireEvent.change(themeSelect, { target: { value: "dark" } });

    expect(themeSelect).toHaveValue("dark");
  });

  it("should render link component", () => {
    const { getByText } = render(<System />);

    const link = getByText("Home");
    expect(link).toBeInTheDocument();
  });

  it("should navigate to article page on enter", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push,
    });

    const { getByPlaceholderText } = render(<System />);

    const input = getByPlaceholderText("Press Enter");
    await userEvent.type(input, "123{Enter}");

    expect(push).toHaveBeenCalledWith("/articles/123");
  });
});

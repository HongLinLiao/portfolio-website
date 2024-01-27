import { render } from "@testing-library/react";
import System from "../page";

describe("#System", () => {
  it("should render link component successfully", () => {
    const { getByText } = render(<System />);

    const link = getByText("Home");
    expect(link).toBeInTheDocument();
  });
});

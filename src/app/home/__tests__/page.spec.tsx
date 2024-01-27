import { render } from "@testing-library/react";
import Home from "../page";

describe("#Home", () => {
  it("should render link component successfully", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Home page")).toBeInTheDocument();
  });
});

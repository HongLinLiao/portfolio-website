import { render } from "@testing-library/react";
import System, { maps } from "../page";

describe("#System", () => {
  it("should render link component successfully", () => {
    const { getByText } = render(<System />);

    maps.forEach((item) => {
      const link = getByText(item.name);
      expect(link).toBeInTheDocument();
    });
  });
});

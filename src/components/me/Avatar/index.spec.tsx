import { render } from "@testing-library/react";
import Avatar from ".";

describe("#Avatar", () => {
  it("should render success", () => {
    const { container } = render(<Avatar />);
    expect(container.getElementsByTagName("img")).toHaveLength(1);
  });
});

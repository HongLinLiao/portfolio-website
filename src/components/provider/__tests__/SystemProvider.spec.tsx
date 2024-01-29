import { render } from "@testing-library/react";
import SystemProvider from "../SystemProvider";
import "@/jest/mockMatchMedia";

describe("#SystemProvider", () => {
  it("should render children", () => {
    const { getByText } = render(
      <SystemProvider>
        <div>Test</div>
      </SystemProvider>
    );

    expect(getByText("Test")).toBeInTheDocument();
  });
});

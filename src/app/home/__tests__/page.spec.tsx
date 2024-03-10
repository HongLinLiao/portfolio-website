import { render } from "@testing-library/react";
import Home from "../page";

jest.mock("@/components/my", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="my-component">Mocked My Component</div>,
  };
});

jest.mock("@/components/article/ArticleBoard", () => {
  return {
    __esModule: true,
    default: () => (
      <div data-testid="article-board">Article Board Component</div>
    ),
  };
});

describe("#Home", () => {
  it("should render my component", () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId("my-component")).toBeInTheDocument();
  });

  it("should render article board component", () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId("article-board")).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";
import ArticleBoardItem from ".";
import { Article } from "@/utils/article";

describe("#ArticleBoardItem", () => {
  const mockArticle: Article = {
    id: "1",
    summary: "test",
    title: "Test Article",
    date: "2024-03-10",
    banner: "/test-banner.jpg",
    contentHtml: "<div>test</div>",
  };

  it("should render article title", () => {
    const { getByText } = render(<ArticleBoardItem {...mockArticle} />);
    const titleElement = getByText("Test Article");
    expect(titleElement).toBeInTheDocument();
  });

  it("should render month date", () => {
    const { getByText } = render(<ArticleBoardItem {...mockArticle} />);
    const monthDateElement = getByText("March 10, 2024");
    expect(monthDateElement).toBeInTheDocument();
  });

  it("should display spinner when image is loading", () => {
    const { container } = render(<ArticleBoardItem {...mockArticle} />);
    const spinnerElement = container.getElementsByTagName("svg");
    expect(spinnerElement).toHaveLength(1);
  });
});

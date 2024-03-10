import { render, waitFor } from "@testing-library/react";
import ArticleBoard from ".";

jest.mock("@/utils/article", () => ({
  getSortedArticle: jest.fn().mockResolvedValue([
    {
      id: "1",
      title: "Test Article 1",
      date: "2024-02-10",
      summary: "This is test article 1 summary",
      banner: "/test1.jpg",
    },
    {
      id: "2",
      title: "Test Article 2",
      date: "2024-02-11",
      summary: "This is test article 2 summary",
      banner: "/test2.jpg",
    },
  ]),
}));

describe("#ArticleBoard", () => {
  test("renders ArticleBoardItem for each article", async () => {
    const Component = await ArticleBoard({});
    const { getAllByRole, getByAltText } = render(Component);
    await waitFor(() => {
      expect(getAllByRole("link").length).toBe(2);
      expect(getByAltText("Test Article 1")).toBeInTheDocument();
      expect(getByAltText("Test Article 2")).toBeInTheDocument();
    });
  });
});

import { render, waitFor } from "@testing-library/react";
import ArticleBoard from ".";

jest.mock("@/utils/article", () => ({
  getSortedArticle: jest.fn().mockReturnValue([
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
  it("should render ArticleBoardItem for each article", async () => {
    const { getAllByRole, getByAltText } = render(<ArticleBoard />);
    await waitFor(() => {
      expect(getAllByRole("link").length).toBe(2);
      expect(getByAltText("Test Article 1")).toBeInTheDocument();
      expect(getByAltText("Test Article 2")).toBeInTheDocument();
    });
  });
});

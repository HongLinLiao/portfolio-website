import React from "react";
import { render, screen } from "@testing-library/react";
import { getArticleData } from "@/utils/article";
import Article from "../page";

jest.mock("@/utils/article", () => ({
  getArticleData: jest.fn(),
}));

jest.mock("@/components/general/date/MonthDate", () => ({
  __esModule: true,
  default: () => <div>Mocked MonthDate</div>,
}));

describe("#Article", () => {
  it("should render article content", async () => {
    const mockArticleData = {
      title: "Test Article",
      summary: "This is a summary of the test article.",
      date: "2021-01-01",
      contentHtml: "<p>This is the content of the test article.</p>",
    };

    (getArticleData as jest.Mock).mockResolvedValue(mockArticleData);

    const Component = await Article({ params: { id: "test-article" } });

    const { findByText, getByText } = render(Component);

    expect(await findByText("Test Article")).toBeInTheDocument();
    expect(
      await findByText("This is a summary of the test article.")
    ).toBeInTheDocument();
    expect(getByText("Mocked MonthDate")).toBeInTheDocument();
    expect(
      getByText("This is the content of the test article.")
    ).toBeInTheDocument();
  });
});

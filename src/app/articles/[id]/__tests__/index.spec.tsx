import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { getArticleData } from "@/utils/article";
import Article from "../page";

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: ReactNode }) => {
      return <>{children}</>;
    },
  };
});

jest.mock("@/utils/article", () => ({
  getArticleData: jest.fn(),
}));

jest.mock("@/components/general/date/MonthDate", () => ({
  __esModule: true,
  default: () => <div>Mocked MonthDate</div>,
}));

jest.mock("@/components/general/shadowDom", () => {
  return {
    __esModule: true,
    default: ({ innerHTML }: { innerHTML: string }) => (
      <div
        dangerouslySetInnerHTML={{ __html: innerHTML }}
        data-testid="shadow-dom"
      ></div>
    ),
  };
});

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

    const { getByTestId, findByText, findByRole, getByText } =
      render(Component);

    expect(
      await findByRole("heading", { name: mockArticleData.title })
    ).toBeInTheDocument();
    expect(await findByText(mockArticleData.summary)).toBeInTheDocument();
    expect(getByText("Mocked MonthDate")).toBeInTheDocument();
    expect(getByTestId("shadow-dom")).toContainHTML(
      mockArticleData.contentHtml
    );
  });
});

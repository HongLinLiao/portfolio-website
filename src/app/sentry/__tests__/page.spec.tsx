import { render, fireEvent, waitFor } from "@testing-library/react";
import Page from "../page";
import * as Sentry from "@sentry/nextjs";

jest.mock("@sentry/nextjs", () => ({
  startSpan: jest.fn(),
}));

describe("Page Component", () => {
  it("renders the component and triggers error", async () => {
    const { getByText, getByRole } = render(<Page />);

    expect(
      getByText("Get started by sending us a sample error:")
    ).toBeInTheDocument();

    fireEvent.click(getByRole("button", { name: "Throw error!" }));

    await waitFor(() => {
      expect(Sentry.startSpan).toHaveBeenCalledTimes(1);
    });
  });
});

import { render, fireEvent, waitFor } from "@testing-library/react";
import * as Sentry from "@sentry/nextjs";
import GlobalError from "../global-error";

jest.mock("@sentry/nextjs", () => ({
  captureException: jest.fn(),
}));

describe("#GlobalError", () => {
  it("should render error message and button", () => {
    const mockError = new Error("Test error");
    const mockReset = jest.fn();

    const { getByText } = render(
      <GlobalError error={mockError} reset={mockReset} />
    );

    expect(getByText("Something went wrong!")).toBeInTheDocument();

    const tryAgainButton = getByText("Try again");
    expect(tryAgainButton).toBeInTheDocument();

    fireEvent.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("should capture exception using Sentry on component mount", async () => {
    const mockError = new Error("Test error");
    const mockReset = jest.fn();

    render(<GlobalError error={mockError} reset={mockReset} />);

    await waitFor(() => {
      expect(Sentry.captureException).toHaveBeenCalledTimes(1);
      expect(Sentry.captureException).toHaveBeenCalledWith(mockError);
    });
  });
});

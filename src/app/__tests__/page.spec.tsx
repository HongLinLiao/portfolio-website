import { render, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import App from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("#App", () => {
  it("should render page successfully", () => {
    const { getByText } = render(<App />);
    expect(
      getByText("Index is not ready, will redirect after 2s....")
    ).toBeInTheDocument();
  });

  it("should redirect /system after 2 seconds", async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    jest.useFakeTimers();

    render(<App />);

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/system");
    });

    jest.runAllTimers();
  });
});

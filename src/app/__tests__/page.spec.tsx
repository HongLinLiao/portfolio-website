import { render, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import App from "../page";

describe("#App", () => {
  it("should render Avatar", () => {
    const { getByAltText } = render(<App />);
    const avatarElement = getByAltText("Avatar");
    expect(avatarElement).toBeInTheDocument();
  });

  it("should render My", () => {
    const { getByText } = render(<App />);
    const myElement = getByText("Leo Liao");
    expect(myElement).toBeInTheDocument();
  });
});

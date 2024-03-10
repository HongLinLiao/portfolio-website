import React from "react";
import { render } from "@testing-library/react";
import MonthDate from ".";

describe("#MonthDate", () => {
  it("should render the formatted date", () => {
    const dateString = "2021-01-01";
    const { getByText } = render(<MonthDate date={dateString} />);
    expect(getByText("January 1, 2021")).toBeInTheDocument();
  });

  it("should set the correct dateTime attribute", () => {
    const dateString = "2021-01-01";
    const { getByText } = render(<MonthDate date={dateString} />);
    const timeElement = getByText("January 1, 2021").closest("time");
    expect(timeElement).toHaveAttribute("dateTime", dateString);
  });
});

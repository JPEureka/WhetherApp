import React from "react";
import { render, act, screen } from "@testing-library/react";
import WeatherIcon from "../WeatherIcon";
jest.mock("../utils", () => {
  return {
    getWeatherIcon: () => Promise.resolve("value"),
  };
});

describe("WeatherIcon", () => {
  const mockProps = {
    icon: "01d",
    main: "testingIcon",
    description: "icon for test",
  };
  it("should render", async () => {
    await act(async () => render(<WeatherIcon {...mockProps} />));
    expect(screen.queryAllByTestId("weather-icon")).toBeTruthy();
    expect(screen.queryAllByTestId("weather-img")).toBeTruthy();
  });
});

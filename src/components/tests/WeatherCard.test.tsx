import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WeatherCard from "../WeatherCard";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: "faIcon",
}));
jest.mock("@fortawesome/free-solid-svg-icons", () => ({
  faWind: "faWind",
  faDroplet: "faDroplet",
  faMapLocationDot: "faMapLocationDot",
  faLocationDot: "faLocationDot",
  faTemperatureQuarter: "faTemperatureQuarter",
  faTemperature2: "faTemperature2",
  faTemperatureLow: "faTemperatureLow",
  faTemperatureHigh: "faTemperatureHigh",
}));

jest.mock("country-code-mapper", () => ({
  getCountryFlag: () => "halo",
  getCountryName: () => "Mock Country",
}));

describe("WeatherCard", () => {
  let spyOnClose = jest.fn();
  const mockProps = {
    coord: { lon: 122.2, lat: 12.1 },
    main: {
      temp: 299.83,
      feels_like: 302.35,
      temp_min: 299.83,
      temp_max: 299.83,
      humidity: 82,
    },
    name: "Santa Fe",
    weather: [
      { id: 803, main: "Clouds", description: "broken clouds", icon: "04n" },
    ],
    wind: { speed: 5.55, deg: 72, gust: 6.99 },
    sys: { country: "PH", sunrise: 1679090229, sunset: 1679133712 },
  };
  it("should render", async () => {
    const { queryByText, queryAllByTestId } = render(
      <WeatherCard {...mockProps} />
    );
    await screen.findByText("Santa Fe");
    expect(screen.findByText("Temp: 27.83")).toBeTruthy();
  });

  it("should show detail info when hover", async () => {
    const { container, queryByLabelText } = render(
      <WeatherCard {...mockProps} />
    );
    await screen.findByText("Santa Fe");
    const card = screen.queryByTestId("weatherCardInner");
    if (card) userEvent.hover(card);

    expect(screen.findByText("Humidity: 82")).toBeTruthy();
    expect(screen.findByText("Lowest tempture: 27.83")).toBeTruthy();
  });
});

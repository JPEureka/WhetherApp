// @ts-nocheck
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MainPanel from "../MainPanel";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: "faIcon",
}));
jest.mock("@fortawesome/free-solid-svg-icons", () => ({
  faSpinner: "faSpinner",
}));

const unmockedFetch = global.fetch;
const mockData = {
  cod: 200,
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

describe("MainPanel", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
  });
  afterEach(() => {
    global.fetch = unmockedFetch;
  });
  it("should render", async () => {
    const { queryByText, queryByTestId } = render(<MainPanel />);
    await queryByTestId("mainPanel");
    expect(
      queryByText("Please input your OpenWeather API key for query:")
    ).toBeTruthy();
    expect(queryByTestId("latInput")).toBeTruthy();
    expect(queryByTestId("lonInput")).toBeTruthy();
    expect(screen.queryByTitle("Query")).toBeTruthy();
  });

  it("should show error banner if query without input lat and lon value", async () => {
    jest.useFakeTimers();
    const { container, queryByTestId } = render(<MainPanel />);
    await queryByTestId("mainPanel");
    const apikeyInput = container.querySelector("#apiKeyInput");
    if (apikeyInput)
      await fireEvent.change(apikeyInput, { target: { value: "333" } });
    jest.runAllTimers();
    const queryBtn = await screen.queryByTitle("Query");
    await fireEvent.click(queryBtn);
    expect(
      screen.findByText("Please input valid latitude and longitude value")
    ).toBeTruthy();
  });

  it("should fetch data if apikey, lat, lon input has value", async () => {
    jest.useFakeTimers();
    const { container, queryByTestId } = render(<MainPanel />);
    await queryByTestId("mainPanel");
    const apikeyInput = container.querySelector("#apiKeyInput");
    const latInput = container.querySelector("#latInput");
    const lonInput = container.querySelector("#latInput");
    if (apikeyInput)
      await fireEvent.change(apikeyInput, { target: { value: "333" } });

    if (latInput)
      await fireEvent.change(latInput, { target: { value: "333" } });

    if (lonInput)
      await fireEvent.change(lonInput, { target: { value: "333" } });

    jest.runAllTimers();
    const queryBtn = await screen.queryByTitle("Query");
    await fireEvent.click(queryBtn);
    expect(screen.findByText("Santa Fe")).toBeTruthy();
  });
});

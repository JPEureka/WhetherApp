import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faDroplet,
  faMapLocationDot,
  faLocationDot,
  faTemperatureQuarter,
  faTemperature2,
  faTemperatureLow,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FToC, getWindDirection } from "./utils";
import "./WeatherCard.scss";
import WeatherIcon from "./WeatherIcon";
import { WeatherCardProp } from "./types";
const countryCodeMapper = require("country-code-mapper");

const WeatherCard = (props?: WeatherCardProp) => {
  if (!props) return <></>;
  const { name, sys, weather, main, wind, coord } = props;
  const weatherInfo = weather && weather[0];
  const location = name
    ? name
    : `Latitude: ${coord?.lat} , Longitude: ${coord?.lon}`;
  return (
    <div className="weather-card">
      <div className="weather-card-inner" data-testid="weatherCardInner">
        <div className="weather-card-front" data-testid="weatherCardFront">
          <div className="location-info" data-testid="locatoinInfo">
            {sys?.country && (
              <div className="icon-entry" data-testid="countryFlag">
                <img
                  src={countryCodeMapper.getCountryFlag(sys?.country)}
                  alt={countryCodeMapper.getCountryName(sys?.country)}
                  title={countryCodeMapper.getCountryName(sys?.country)}
                  className="countryFlag"
                />
              </div>
            )}

            <div className="icon-entry" data-testid="location">
              <FontAwesomeIcon icon={name ? faMapLocationDot : faLocationDot} />
              <label>{location}</label>
            </div>
          </div>
          <WeatherIcon {...weatherInfo} />
          <div className="weather-info" data-testid="weatherInfo">
            <div className="icon-entry" data-testid="tempture">
              <FontAwesomeIcon icon={faTemperatureQuarter} />
              <label>{`Temp: ${FToC(main?.temp)} °C`}</label>
            </div>
            <div className="icon-entry" data-testid="feelsLike">
              <FontAwesomeIcon icon={faTemperature2} />
              <label>{`Feels Like: ${FToC(main?.feels_like)} °C`}</label>
            </div>
          </div>
        </div>
        <div className="weather-card-back" data-testid="weatherCardBack">
          <div className="icon-entry" data-testid="wind">
            <FontAwesomeIcon icon={faWind} />
            <label>{`${wind?.speed} ${getWindDirection(wind?.deg)}`}</label>
          </div>
          <div className="icon-entry" data-testid="highestTempture">
            <FontAwesomeIcon icon={faTemperatureHigh} />
            <label>{`Highest tempture: ${FToC(main?.temp_max)}`}</label>
          </div>
          <div className="icon-entry" data-testid="lowestTempture">
            <FontAwesomeIcon icon={faTemperatureLow} />
            <label>{`Lowest tempture: ${FToC(main?.temp_min)}`}</label>
          </div>
          <div className="icon-entry" data-testid="humidity">
            <FontAwesomeIcon icon={faDroplet} />
            <label>{`Humidity: ${main?.humidity}`}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

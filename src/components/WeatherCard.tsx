import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faDroplet,
  faGlobe,
  faMapLocation,
  faTemperatureQuarter,
  faTemperature2,
  faTemperatureLow,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FToC, getWindDirection } from "./utils";
import "./WeatherCard.scss";
import WeatherIcon from "./WeatherIcon";
import { WeatherCardProp } from "./types";

const WeatherCard = (props?: WeatherCardProp) => {
  if (!props) return <></>;
  const { name, sys, weather, main, wind } = props;
  const weatherInfo = weather && weather[0];
  console.log(props);
  return (
    <div className="weather-card">
      <div className="weather-card-inner">
        <div className="weather-card-front">
          <div className="location-info">
            <div className="icon-entry">
              <FontAwesomeIcon icon={faGlobe} />
              <label>{sys?.country}</label>
            </div>
            <div className="icon-entry">
              <FontAwesomeIcon icon={faMapLocation} />
              <label>{name}</label>
            </div>
          </div>
          <WeatherIcon {...weatherInfo} />
          <div className="weather-info">
            <div className="icon-entry">
              <FontAwesomeIcon icon={faTemperatureQuarter} />
              <label>{`Temp: ${FToC(main?.temp)} °C`}</label>
            </div>
            <div className="icon-entry">
              <FontAwesomeIcon icon={faTemperature2} />
              <label>{`Feels Like: ${FToC(main?.feels_like)} °C`}</label>
            </div>
          </div>
        </div>
        <div className="weather-card-back">
          <div className="icon-entry">
            <FontAwesomeIcon icon={faWind} />
            <label>{`${wind?.speed} ${getWindDirection(wind?.deg)}`}</label>
          </div>
          <div className="icon-entry">
            <FontAwesomeIcon icon={faTemperatureHigh} />
            <label>{`Highest tempture: ${FToC(main?.temp_max)}`}</label>
          </div>
          <div className="icon-entry">
            <FontAwesomeIcon icon={faTemperatureLow} />
            <label>{`Lowest tempture: ${FToC(main?.temp_min)}`}</label>
          </div>
          <div className="icon-entry">
            <FontAwesomeIcon icon={faDroplet} />
            <label>{`Humidity: ${main?.humidity}`}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

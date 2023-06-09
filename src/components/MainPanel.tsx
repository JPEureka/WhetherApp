import React from "react";
import WeatherCard from "./WeatherCard";
import Banner from "./Banner";
import { getErrorMessage } from "./utils";
import { WeatherInfo, ERROR_CODE_MAP } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./MainPanel.scss";

const MainPanel = () => {
  const [weatherInfo, setWeatherInfo] = React.useState<Array<WeatherInfo>>([]);
  const [apiKey, setApiKey] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showBanner, setShowBanner] = React.useState(false);
  const [bannerMessage, setBannerMessage] = React.useState("");
  let debunceTimeout: any;

  const debunceSetKey = (val: any) => {
    clearTimeout(debunceTimeout);

    debunceTimeout = setTimeout(() => {
      setApiKey(val);
    }, 500);
  };

  const onBannerClose = () => {
    setShowBanner(false);
  };

  const fetchData = async () => {
    const lat = (document.querySelector("#latInput") as HTMLInputElement).value;
    const lon = (document.querySelector("#lonInput") as HTMLInputElement).value;
    if (!lat || !lon) {
      setBannerMessage(getErrorMessage({ code: "INVALID_LAT_LON" }));
      setShowBanner(true);
      setTimeout(() => onBannerClose(), 2000);
      return;
    }

    setLoading(true);

    const base =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
      `lon=${lon}&appid=${apiKey}`;

    try {
      await fetch(base)
        .then((res) => res.json())
        .then((data) => {
          if (data?.cod !== 200) {
            setBannerMessage(
              getErrorMessage({
                code: ERROR_CODE_MAP[data.cod],
                message: data?.message,
              })
            );
            setShowBanner(true);
          } else {
            setWeatherInfo([...weatherInfo, data]);
          }
        });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="main-panel"data-testid="mainPanel">
      {showBanner && <Banner message={bannerMessage} onClose={onBannerClose} />}
      <div className="input-entry" data-testid="apiKeyInput">
        <label htmlFor="apiKeyInput">
          Please input your OpenWeather API key for query:{" "}
        </label>
        <input
          type="text"
          id="apiKeyInput"
          onKeyUp={(evt) =>
            debunceSetKey((evt.target as HTMLInputElement).value)
          }
          placeholder="Enter Apikey"
        />
      </div>

      <div className="lat-lon-query">
        <div className="input-entry" data-testid="latInput">
          <label htmlFor="latInput">Latitude: </label>
          <input type="number" id="latInput" placeholder="Enter latitude" />
        </div>
        <div className="input-entry" data-testid="lonInput">
          <label htmlFor="lonInput">Longitude: </label>
          <input type="text" id="lonInput" placeholder="Enter longitude" />
        </div>
        <button
          disabled={!apiKey}
          onClick={fetchData}
          title="Query"
          aria-label="Query"
        >
          Query
        </button>
        {loading && <FontAwesomeIcon className="loading" icon={faSpinner} />}{" "}
      </div>
      {weatherInfo.length > 0 && (
        <div className="weather-cards">
          {weatherInfo.map((info, index) => (
            <WeatherCard key={index} {...info} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPanel;

import React from "react";
import WeatherCard from "./WeatherCard";
import Banner from "./Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./InputPanel.scss";

const apiKey = "a9c81c8b39fb8c51f9699745e39c182f";
const InputPanel = () => {
  const [geoInfo, setGeoInfo] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [showBanner, setShowBanner] = React.useState(false);

  const onBannerClose = () => {
    setShowBanner(false);
  };

  const fetchData = async () => {
    const lat = (document.querySelector("#latInput") as HTMLInputElement).value;
    const lon = (document.querySelector("#lonInput") as HTMLInputElement).value;
    if (!lat || !lon) {
      setShowBanner(true);
      setTimeout(() => onBannerClose, 5000);
      return;
    }

    setLoading(true);

    const base =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
      `lon=${lon}&appid=${apiKey}`;

    try {
      await fetch(base)
        .then((res) => res.json())
        .then((data) => setGeoInfo(data));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="input-panel">
      {showBanner && <Banner onClose={onBannerClose} />}
      <div className="input-entry">
        <label>LAT: </label>
        <input type="number" id="latInput" placeholder="Enter lat" />
      </div>
      <div className="input-entry">
        <label>LON: </label>
        <input type="text" id="lonInput" placeholder="Enter lon" />
      </div>
      <button onClick={fetchData}>Query</button>
      {loading && <FontAwesomeIcon className="loading" icon={faSpinner} />}
      {Object.keys(geoInfo).length !== 0 && <WeatherCard {...geoInfo} />}
    </div>
  );
};

export default InputPanel;

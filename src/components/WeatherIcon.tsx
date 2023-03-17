import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { WeatherIconProp } from "./types";

const WeatherIcon = (props: WeatherIconProp) => {
  const { icon, main, description } = props;
  const [loading, setLoading] = React.useState(true);
  const [image, setImage] = React.useState("");
  const imgSrc = `../icons/${icon}.png`;
  const fetchImg = async () => {
    await import(`../icons/${icon}.png`).then((res) => {
      setImage(res.default);
      setLoading(false);
    });
  };
  React.useEffect(() => {
    fetchImg();
  }, [imgSrc]);

  return (
    <div className="weather-icon">
      {loading ? (
        <FontAwesomeIcon className="loading" icon={faSpinner} />
      ) : (
        <img src={image} alt={main} title={description} />
      )}
    </div>
  );
};
export default WeatherIcon;

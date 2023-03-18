import React from "react";
import { WeatherIconProp } from "./types";
import { getWeatherIcon } from "./utils";

const WeatherIcon = (props: WeatherIconProp) => {
  const { icon, main, description } = props;
  const [image, setImage] = React.useState("");
  const fetchImg = async () => {
    const img = await getWeatherIcon(icon);
    setImage(img);
  };
  React.useEffect(() => {
    fetchImg();
  }, []);

  return (
    <div className="weather-icon" data-testid="weather-icon">
      <img
        src={image}
        alt={main}
        title={description}
        data-test-id="weather-img"
      />
    </div>
  );
};
export default WeatherIcon;

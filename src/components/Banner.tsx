import React from "react";
import "./Banner.scss";
type props = {
  onClose: () => void;
};

const Banner = ({ onClose }: props) => {
  return (
    <div className="banner">
      Please input valid latitude and longitude!
      <span>
        You can visit this{" "}
        <a href="https://www.latlong.net/" target="_blank">
          website
        </a>{" "}
        to check target latitude and longitude.
      </span>
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Banner;

import React from "react";
import "./Banner.scss";
import { BannerProps } from "./types";

const Banner = ({ message, onClose }: BannerProps) => {
  return (
    <div className="banner">
      <span>{message}</span>
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Banner;

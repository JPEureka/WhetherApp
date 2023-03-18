import React from "react";
import "./Banner.scss";
import { BannerProps } from "./types";

const Banner = ({ message, onClose }: BannerProps) => {
  return (
    <div className="banner" data-testid="banner">
      <span>{message}</span>
      <button title={"Close"} aria-label={"Close"} onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Banner;

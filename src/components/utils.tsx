const kelvin = 273;
export const FToC = (degreeF?: number): number | void => {
  if (degreeF) return Math.floor(degreeF - kelvin);
};

export const getWindDirection = (degree?: number): string => {
  if (!degree) return "--";
  if (degree > 337.5) return "N";
  if (degree > 292.5) return "NW";
  if (degree > 247.5) return "W";
  if (degree > 202.5) return "SW";
  if (degree > 157.5) return "S";
  if (degree > 122.5) return "SE";
  if (degree > 67.5) return "E";
  if (degree > 22.5) {
    return "NE";
  }
  return "N";
};

export const getWeatherIcon = async (name?: string): Promise<string> => {
  if (name)
    return await import(`../icons/${name}.png`).then((res) => res.default);
  return "";
};

export const getErrorMessage = ({
  code,
  message = "",
}: {
  code: string;
  message?: string;
}): string => {
  const messages: {
    [key: string]: string;
  } = {
    INVALID_LAT_LON: "Please input valid latitude and longitude value",
  };
  return message || messages[code] || "OOPS~ Something went wrong!";
};

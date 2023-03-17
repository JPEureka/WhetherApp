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

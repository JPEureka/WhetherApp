export type WeatherCardProp = {
  name?: string;
  sys?: { country: string };
  weather?: Array<WeatherIconProp>;
  main?: {
    temp: number | undefined;
    temp_max: number | undefined;
    temp_min: number | undefined;
    feels_like: number | undefined;
    humidity: number | undefined;
  };
  wind?: { speed: number | undefined; deg: number | undefined };
};

export type WeatherIconProp = {
  description?: string;
  id?: number | undefined;
  icon?: string;
  main?: string;
};

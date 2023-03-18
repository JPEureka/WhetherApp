export type WeatherInfo = {
  cod: number;
  message?: string;
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
  coord?: { lat: number | undefined; lon: number | undefined };
};
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
  coord?: { lat: number | undefined; lon: number | undefined };
};

export type WeatherIconProp = {
  description?: string;
  id?: number | undefined;
  icon?: string;
  main?: string;
};

export type BannerProps = {
  message: string;
  onClose: () => void;
};

export interface LocationResponce {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Record<string, unknown>;
  text: string;
  text_en: string;
  place_name: string;
  matching_text: string;
  matching_place_name: string;
  center: [number, number];
  address: string;
}

export interface ForecastResponce {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface CurrentWeather {
  last_updated: string;
  temp_c: number;
  is_day: number;
  condition: {
    text: string;
    code: number;
  };
  pressure_mb: number;
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
  uv: number;
}

export interface ForecastDay {
  date: string;
  day: {
    avgtemp_c: number;
    totalsnow_cm: number;
    condition: {
      text: string;
      code: number;
    };
  };
  astro: Record<string, unknown>;
  hour: ByHoursObject[];
}

export interface ByHoursObject {
  time: string;
  temp_c: number;
  is_day: number;
  condition: {
    code: number;
  };
}

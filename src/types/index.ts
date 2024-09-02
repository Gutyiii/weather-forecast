export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface WeatherData {
  temperature: number;
  weatherDescription: string;
  forecast: DailyForecast[];
}

export interface DailyForecast {
  date: string;
  minTemp: number;
  maxTemp: number;
  precipitationProbability: number;
  weatherIcon: string;
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
}

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  precipitation_probability_mean: number[];
}

export interface SelectedCityProps {
  city: {
    name: string;
    latitude: number;
    longitude: number;
  };
  weatherData: {
    hourly: HourlyData;
    daily: DailyData;
  };
}

export interface WeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_mean: number[];
  };
}
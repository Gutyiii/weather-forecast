import { useState, useCallback } from "react";
import { WeatherData } from '../types/index'

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeatherData = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const WEATHER_API_URL = process.env.REACT_APP_WEATHER_API_URL;
        if (!WEATHER_API_URL) {
          throw new Error("WEATHER_API_URL is not defined in the environment variables");
        }

        const response = await fetch(
          `${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_mean&hourly=temperature_2m,weathercode&timezone=GMT`
        );

        if (!response.ok) { 
            throw new Error(`Failed to fetch weather data: ${response.statusText}`); 
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      }
    },
    []
  );

  return { weatherData, fetchWeatherData };
};

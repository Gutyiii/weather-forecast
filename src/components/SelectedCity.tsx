import React from "react";
import style from "./SelectedCity.module.css";
import CityChart from "./CityChart";
import { HourlyData, DailyData, SelectedCityProps } from "../types/index";

const getCurrentDayIndex = () => {
  return new Date().getDay(); // 0 = Vasárnap, 1 = Hétfő, stb.
};

const getCurrentWeather = (data: HourlyData) => {
  const now = new Date();
  const currentHourIndex = data.time.findIndex(
    (time) => new Date(time).getHours() === now.getHours()
  );
  const currentTemperature = data.temperature_2m[currentHourIndex] || "N/A";
  const currentWeatherCode = data.weathercode[currentHourIndex] || 0;

  // Általános időjárási állapotok leképezése weathercode alapján
  const weatherConditions: { [key: number]: string } = {
    0: "Derült",
    1: "Főleg derült",
    2: "Részben felhős",
    3: "Borult",
    45: "Köd",
    48: "Lerakódó zúzmarás köd",
    51: "Enyhe szitálás",
    53: "Mérsékelt szitálás",
    55: "Sűrű szitálás",
    56: "Enyhe ónos szitálás",
    57: "Sűrű ónos szitálás",
    61: "Gyenge záporeső",
    63: "Mérsékelt záporeső",
    65: "Heves záporeső",
    66: "Enyhe ónos eső",
    67: "Heves ónos eső",
    71: "Gyenge hózápor",
    73: "Mérsékelt hózápor",
    75: "Heves hózápor",
    77: "Hógolyók",
    80: "Gyenge eső",
    81: "Mérsékelt eső",
    82: "Heves eső",
    85: "Gyenge havazás",
    86: "Heves havazás",
    95: "Zivatar",
    96: "Zivatar jégesővel",
    99: "Zivatar jégesővel",
  };

  return {
    temperature: currentTemperature,
    condition: weatherConditions[currentWeatherCode] || "Unknown",
  };
};

const getWeeklyForecast = (data: DailyData) => {
  const days = [
    "Vasárnap",
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
  ];
  const currentDayIndex = getCurrentDayIndex();
  const weeklyData = [];

  for (let i = 0; i < 7; i++) {
    const index = (currentDayIndex + i) % 7;
    const dayData = {
      day: days[index],
      minTemp: data.temperature_2m_min[i],
      maxTemp: data.temperature_2m_max[i],
      precipitationSum: data.precipitation_sum[i],
      precipitationProbability: data.precipitation_probability_mean[i],
    };
    weeklyData.push(dayData);
  }

  return weeklyData;
};

const SelectedCity: React.FC<SelectedCityProps> = ({ city, weatherData }) => {
  const { temperature, condition } = getCurrentWeather(weatherData.hourly);
  const weeklyForecast = getWeeklyForecast(weatherData.daily);
  const maxTemps = weatherData.daily.temperature_2m_max;

  if (!city || !weatherData) {
    return <div>No city selected</div>;
  }

  return (
    <div className={style.main}>
      <div className={style.content}>
        <div className={style.today}>
          <div className={style.todayCity}>{city.name}</div>
          <div className={style.todayTemperature}>{temperature} °C</div>
          <div className={style.todayCondition}>{condition}</div>
        </div>
        <div className={style.weekly}>
          <h5>7 napos előrejelzés</h5>
          {weeklyForecast.map((day, index) => (
            <div key={index} className={style.weekDay}>
              <div>{day.day}</div>
              <div>
                <i className="fas fa-cloud-showers-heavy"></i>{" "}
                {day.precipitationProbability}%
              </div>
              <div>
                {day.minTemp}°C - {day.maxTemp}°C
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={style.chart}>
        <CityChart maxTemps={maxTemps} />
      </div>
    </div>
  );
};

export default SelectedCity;

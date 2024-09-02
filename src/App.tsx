import React, { useState, useEffect } from "react";
import "./App.css";
import { useGeocoding } from "./hooks/useGeocoding";
import { useWeatherData } from "./hooks/useWeatherData";
import SelectedCity from "./components/SelectedCity";
import { City } from "./types";

const App: React.FC = () => {
  const [city, setCity] = useState("");
  const [count, setCount] = useState(1);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { weatherData, fetchWeatherData } = useWeatherData();
  const { cities, error, searchCities } = useGeocoding(count);

  const handleSearch = async () => {
    const query = city.trim() || "";
    await searchCities(query);

    if (count > 1) {
      setShowModal(true);
    }
  };

  const handleCitySelect = async (city: City) => {
    setSelectedCity(city);
    setShowModal(false);
    await fetchWeatherData(city.latitude, city.longitude);
  };

  useEffect(() => {
    if (count === 1 && cities.length > 0) {
      const city = cities[0];
      setSelectedCity(city);
      fetchWeatherData(city.latitude, city.longitude);
    }
  }, [cities, count, fetchWeatherData]);

  useEffect(() => {
    if (count > 1 && cities.length > 0 && !selectedCity) {
      setShowModal(true);
    }
  }, [cities, count, selectedCity]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Írd be a város nevét"
          className="search-input"
        />
        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="search-select"
        >
          <option value={1}>1</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <button onClick={handleSearch} className="search-button">
          Keresés
        </button>
      </div>

      <div className="message-container">
        {cities.length === 0 && !city && (
          <p className="empty">Kérlek válassz egy várost</p>
        )}
      </div>

      {cities.length !== 0 && selectedCity && weatherData && (
        <SelectedCity city={selectedCity} weatherData={weatherData} />
      )}

      {error && <p>Error: {error}</p>}

      {showModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Select a City</h2>
            </div>
            <div className="modal-body">
              <ul>
                {cities.map((city: City) => (
                  <li key={city.id} onClick={() => handleCitySelect(city)}>
                    {city.name}, {city.country} (Lat: {city.latitude}, Lon:{" "}
                    {city.longitude})
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button onClick={handleCloseModal}>Bezárás</button>
            </div>
          </div>
        </div>
      )}

      <div className="name">Gutyina András</div>
    </div>
  );
};

export default App;

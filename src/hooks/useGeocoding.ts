import { useState } from "react";
import axios from "axios";

const GEOCODING_API_URL = process.env.REACT_APP_GEOCODING_API_URL;

export const useGeocoding = (count: number) => {
  const [cities, setCities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const searchCities = async (query: string) => {
    setError(null);

    try {
      const response = await axios.get(GEOCODING_API_URL!, { 
        params: {
          name: query,
          count: count,
          language: "en",
          format: "json",
        },
      });

      setCities(response.data.results || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return { cities, error, searchCities };
};

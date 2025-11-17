"use client";

import WeatherCard from "./components/WeatherCard";
import { useState } from "react";

const getBackgroundImage = (weatherCode: string) => {
  switch (weatherCode) {
    case "01d":
    case "01n":
      return "/sunny.jpg";       // Clear Sky
    case "02d":
    case "02n":
    case "03d":
    case "03n":
      return "/cloudy.jpg";      // Clouds
    case "04d":
    case "04n":
      return "/dark-clouds.jpg"; // Overcast
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return "/rainy.jpg";        // Rain
    case "11d":
    case "11n":
      return "/storm.jpg";       // Thunderstorm
    case "13d":
    case "13n":
      return "/snow.jpg";        // Snow  
    case "50d":
    case "50n":
      return "/haze.jpg";        // Fog / Mist  
    default:
      return "/default.jpg";
  }
};


export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      if (!city.trim()) return;
      setLoading(true);
      setError("");

      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unable to fetch data");
        return;
      }

      // API returns: { current, forecast }
      setWeatherData(data.current);
      setForecastData(data.forecast);
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const getDailyForecast = () => {
    if (!forecastData) return [];

    const daily: any = {};
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (!daily[date]) daily[date] = item;
    });

    return Object.values(daily).slice(0, 5);
  };

  return (
    <div
  className="min-h-screen flex flex-col items-center justify-center px-6"
  style={{
    backgroundImage: weatherData
      ? `url('${getBackgroundImage(weatherData.weather?.[0]?.icon)}')`
      : "url('/default.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "0.4s ease",
  }}
>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/50 to-indigo-900/70 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
          🌦️ Weather
        </h1>

        {/* Search Box */}
        <div className="flex gap-3 mb-8 bg-white/90 rounded-2xl shadow-lg p-3">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={getWeather}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl shadow hover:opacity-90 transition"
          >
            Search
          </button>
        </div>

        {loading && (
          <p className="text-center text-white text-lg animate-pulse">
            Fetching weather...
          </p>
        )}

        {error && <p className="text-red-200 text-center">{error}</p>}

        {/* FULL WEATHER CARD AREA */}
        {weatherData && (
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center">
            
            {/* Show WeatherCard */}
            <WeatherCard weather={weatherData} />

            {/* Forecast */}
            <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">
              5-Day Forecast
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {getDailyForecast().map((day: any, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-b from-blue-100 to-white rounded-xl p-4 flex flex-col items-center shadow"
                >
                  <span className="font-medium text-gray-700">
                    {new Date(day.dt_txt).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </span>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather?.[0]?.icon}@2x.png`}
                    alt="icon"
                  />
                  <span className="text-gray-900 font-semibold">
                    {Math.round(day.main?.temp)}°C
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

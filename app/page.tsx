"use client";

import { useState } from "react";
import Image from "next/image";

interface WeatherMain {
  temp: number;
  feels_like: number;
  humidity: number;
}

interface WeatherWeather {
  description: string;
  icon: string;
}

interface CurrentWeather {
  name: string;
  sys?: { country: string };
  main: WeatherMain;
  weather: WeatherWeather[];
  wind: { speed: number };
}

interface ForecastItem {
  dt_txt: string;
  main: { temp: number };
  weather: WeatherWeather[];
}

interface WeatherData {
  current: CurrentWeather;
  forecast: { list: ForecastItem[] };
}

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getWeather = async () => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.error || "Failed to fetch weather");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getDailyForecast = (forecastData: WeatherData["forecast"]) => {
    if (!forecastData) return [];
    const daily: Record<string, ForecastItem> = {};
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (!daily[date]) {
        daily[date] = item;
      }
    });
    return Object.values(daily).slice(0, 5);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
      style={{
        backgroundImage:
"url('https://png.pngtree.com/thumb_back/fh260/back_our/20190628/ourmid/pngtree-hand-drawn-blue-sky-white-clouds-weather-forecast-illustration-background-image_270899.jpg        backgroundSize: "cover",')
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/50 to-indigo-900/70 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
          🌦 Weather Dashboard
        </h1>

        {/* Search Box */}
        <div className="flex gap-3 mb-8 bg-white/90 rounded-2xl shadow-lg p-3 justify-center">
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

        {/* Loading */}
        {loading && (
          <p className="text-white text-lg animate-pulse">Fetching weather...</p>
        )}

        {/* Error */}
        {error && <p className="text-red-200">{error}</p>}

        {/* Weather Card */}
        {weather && (
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-center">
            {/* Current Weather */}
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {weather.current.name}, {weather.current.sys?.country}
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Current Weather Icon */}
            <div className="flex justify-center mb-4">
              <Image
                src={`https://openweathermap.org/img/wn/${weather.current.weather?.[0]?.icon}@4x.png`}
                alt="Weather Icon"
                width={150}
                height={150}
              />
            </div>

            <p className="text-6xl font-bold text-gray-900 mb-2">
              {Math.round(weather.current.main?.temp)}°C
            </p>
            <p className="text-lg text-gray-600 capitalize mb-6">
              {weather.current.weather?.[0]?.description}
            </p>

            {/* Extra Info */}
            <div className="grid grid-cols-3 gap-6 mt-6 text-sm text-gray-700 text-center">
              <div className="flex flex-col items-center">
                <span className="font-medium">Feels Like</span>
                <div>{Math.round(weather.current.main?.feels_like)}°C</div>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">Humidity</span>
                <div>{weather.current.main?.humidity}%</div>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">Wind</span>
                <div>{weather.current.wind?.speed} m/s</div>
              </div>
            </div>

            {/* Forecast */}
            <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">
              5-Day Forecast
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {getDailyForecast(weather.forecast).map((day, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-b from-blue-100 to-white rounded-xl p-4 flex flex-col items-center shadow"
                >
                  <span className="font-medium text-gray-700 mb-2">
                    {new Date(day.dt_txt).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </span>
                  <div className="flex justify-center mb-2">
                    <Image
                      src={`https://openweathermap.org/img/wn/${day.weather?.[0]?.icon}@2x.png`}
                      alt="icon"
                      width={50}
                      height={50}
                    />
                  </div>
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

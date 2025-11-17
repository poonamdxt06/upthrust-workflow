"use client";

import { motion } from "framer-motion";

export default function WeatherCard({ weather }: any) {
  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-white/20 backdrop-blur-xl border border-white/30 
                 shadow-2xl rounded-3xl p-8 text-center"
    >
      {/* Floating Glow Effect */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-400/30 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-300/30 blur-3xl rounded-full"></div>

      {/* City + Date */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-white drop-shadow"
      >
        {weather.name}, {weather.sys?.country}
      </motion.h2>

      <p className="text-gray-200 text-sm mb-3">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Weather Icon */}
      <motion.img
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 2, opacity: 0.9 }}
        transition={{ duration: 0.6 }}
        src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@4x.png`}
        alt="Weather Icon"
        className="mx-auto drop-shadow-xl"
      />

      {/* Main Temp */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-7xl font-extrabold text-white drop-shadow"
      >
        {Math.round(weather.main?.temp)}°C
      </motion.p>

      <p className="text-gray-200 capitalize text-lg mb-5">
        {weather.weather?.[0]?.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mt-6 text-center text-white">
        {/* Feels Like */}
        <motion.div
          whileHover={{ scale: 1.00 }}
          className="bg-white/10 p-4 rounded-xl backdrop-blur-md shadow"
        >
          <p className="text-sm font-medium">Feels Like</p>
          <p className="text-xl font-bold">
            {Math.round(weather.main?.feels_like)}°C
          </p>
        </motion.div>

        {/* Humidity */}
        <motion.div
          whileHover={{ scale: 1.00 }}
          className="bg-white/10 p-4 rounded-xl backdrop-blur-md shadow"
        >
          <p className="text-sm font-medium">Humidity</p>
          <p className="text-xl font-bold">{weather.main?.humidity}%</p>
        </motion.div>

        {/* Wind */}
        <motion.div
          whileHover={{ scale: 1.00 }}
          className="bg-white/10 p-4 rounded-xl backdrop-blur-md shadow"
        >
          <p className="text-sm font-medium">Wind</p>
          <p className="text-xl font-bold">{weather.wind?.speed} m/s</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

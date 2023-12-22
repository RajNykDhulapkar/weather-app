/* eslint-disable @next/next/no-img-element */

"use client";

import { WeatherIconProps } from "@/types/weather";

const WeatherIcon: React.FC<WeatherIconProps> = ({
  icon,
  description,
  className,
}) => {
  const getWeatherIcon = (icon?: string): string => {
    const iconMap: Record<string, string> = {
      "01d": "day.svg",
      "01n": "night.svg",
      "02d": "cloudy-day-1.svg",
      "02n": "cloudy-night-1.svg",
      "03d": "cloudy-day-2.svg",
      "03n": "cloudy-night-2.svg",
      "04d": "cloudy-day-3.svg",
      "04n": "cloudy-night-3.svg",
      "09d": "rainy-6.svg",
      "09n": "rainy-6.svg",
      "10d": "rainy-3.svg",
      "10n": "rainy-3.svg",
      "11d": "thunder.svg",
      "11n": "thunder.svg",
      "13d": "snowy-3.svg",
      "13n": "snowy-3.svg",
      "50d": "cloudy.svg",
      "50n": "cloudy.svg",
    };

    return iconMap[icon ?? ""] ?? "cloudy.svg";
  };

  return (
    <img
      src={getWeatherIcon(icon)}
      alt={description || "weather icon"}
      className={className}
    />
  );
};

export default WeatherIcon;

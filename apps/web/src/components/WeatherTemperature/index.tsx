"use client";

import { WeatherTemperatureProps } from "@/types/weather";

const WeatherTemperature: React.FC<WeatherTemperatureProps> = ({
  temperature,
  minTemperature,
  maxTemperature,
}) => (
  <div className="flex flex-col gap-4 items-center justify-start">
    <div className="text-8xl font-thin text-muted-foreground">
      {temperature ? `${Math.round(temperature)}°` : "--°"}
    </div>
    {minTemperature !== undefined && maxTemperature !== undefined && (
      <div>
        {Math.floor(minTemperature)}° / {Math.ceil(maxTemperature)}°
      </div>
    )}
  </div>
);

export default WeatherTemperature;

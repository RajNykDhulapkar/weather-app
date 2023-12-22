"use client";
import { WeatherMetricProps } from "@/types/weather";

const WeatherMetric: React.FC<WeatherMetricProps> = ({ icon, value, unit }) => (
  <div className="flex items-center gap-4 text-muted-foreground">
    {icon}
    <span>
      {value}
      {unit}
    </span>
  </div>
);

export default WeatherMetric;

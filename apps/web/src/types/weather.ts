export interface WeatherIconProps {
  icon?: string;
  description?: string;
  className?: string;
}

export interface WeatherMetricProps {
  icon: React.ReactNode;
  value: string | number;
  unit?: string;
}

export interface WeatherTemperatureProps {
  temperature?: number;
  minTemperature?: number;
  maxTemperature?: number;
}

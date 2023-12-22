import { z } from "zod";

export enum ErrorCode {
  NOT_FOUND = "NOT_FOUND",
  CITY_NOT_FOUND = "CITY_NOT_FOUND",
  WEATHER_API_ERROR = "WEATHER_API_ERROR",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export type WeatherData = {
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
  humidity: number;
  windSpeed: number;
  rain: number;
  cloudy: number;
  description: string;
  icon: string;
  city: string;
};

export type ForecastData = {
  day: string;
  minTemperature: number;
  maxTemperature: number;
  description: string;
  icon: string;
};

export type WeatherApiResponse = {
  current: WeatherData;
  forecast: ForecastData[];
};

export type ErrorResponse = {
  message: string;
  code: string;
};

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export const serverSchema = z.object({
  OPENWEATHER_API_KEY: z.string().default("e26797a87d88e2498f134201dd597843"),
  PORT: z.string().default("8080"),
  WEB_APP_URL: z.string().url().default("http://localhost:3000"),
});

export const clientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:8080"),
});

export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;

export class EnvManager {
  private static serverInstance: ServerEnv;
  private static clientInstance: ClientEnv;

  static getServerEnv(processEnv = process.env): ServerEnv {
    if (!this.serverInstance) {
      this.serverInstance = serverSchema.parse({
        NODE_ENV: processEnv.NODE_ENV,
        OPENWEATHER_API_KEY: processEnv.OPENWEATHER_API_KEY,
        PORT: processEnv.PORT,
        WEB_APP_URL: processEnv.WEB_APP_URL,
      });
    }
    return this.serverInstance;
  }

  static getClientEnv(processEnv = process.env): ClientEnv {
    if (!this.clientInstance) {
      this.clientInstance = clientSchema.parse({
        NEXT_PUBLIC_API_URL: processEnv.NEXT_PUBLIC_API_URL,
      });
    }
    return this.clientInstance;
  }
}

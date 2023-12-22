import request from "supertest";

import { app } from "./app";

describe("API Endpoints", () => {
  describe("GET /ping", () => {
    it("should return pong message", async () => {
      const response = await request(app).get("/ping");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "pong",
        data: "ok",
      });
    });
  });

  describe("GET /weather", () => {
    const mockWeatherData = {
      main: {
        temp: 20,
        humidity: 65,
      },
      wind: {
        speed: 5.5,
      },
      weather: [
        {
          description: "scattered clouds",
        },
      ],
      name: "London",
    };

    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWeatherData),
        } as Response),
      );
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return weather data for valid city", async () => {
      const response = await request(app)
        .get("/weather")
        .query({ city: "London" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Weather data retrieved successfully",
        data: {
          temperature: 20,
          humidity: 65,
          windSpeed: 5.5,
          description: "scattered clouds",
          city: "London",
        },
      });

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("London"));
    });

    it("should return 400 if city parameter is missing", async () => {
      const response = await request(app).get("/weather");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "City parameter is required",
        code: "MISSING_CITY",
      });
    });

    it("should handle city not found error", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404,
        } as Response),
      );

      const response = await request(app)
        .get("/weather")
        .query({ city: "NonExistentCity" });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "City not found",
        code: "CITY_NOT_FOUND",
      });
    });

    it("should handle API errors", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        } as Response),
      );

      const response = await request(app)
        .get("/weather")
        .query({ city: "London" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        message: "Failed to fetch weather data",
        code: "WEATHER_API_ERROR",
      });
    });
  });

  describe("404 Handler", () => {
    it("should return 404 for non-existent routes", async () => {
      const response = await request(app).get("/non-existent-route");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Resource not found",
        code: "NOT_FOUND",
      });
    });
  });
});

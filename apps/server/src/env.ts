import { EnvManager } from "@weather-app/types";

export const env = EnvManager.getServerEnv(process.env);

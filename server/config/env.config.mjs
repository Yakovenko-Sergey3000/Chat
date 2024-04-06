import { config } from "dotenv";
config();

export const CONFIG = {
  PORT: process.env.PORT,
};

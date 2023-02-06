import winston from "winston";
import { isDev } from "../config/env.config.js";

const transportOptions = {
  file: {
    level: "info",
    filename: "../../logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: false,
  },
};

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => (isDev ? "debug" : "warn");
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message}`
  )
);

const logger = winston.createLogger({
  level: level(),
  levels: levels,
  transports: [
    new winston.transports.File(transportOptions.file),

    new winston.transports.Console(transportOptions.console),
  ],
  format,

  exitOnError: false,
});

export default logger;

import morgan from 'morgan'

import { isDev } from "../config/env.config.js";
import logger from "../utils/logger.utils.js";

var stream = {}
 stream = {
  write: (str) => logger.http(str),
};

const skip = () => !isDev;

const morganMiddleware = morgan(
  ":remote-addr :remote-user method=:method URL=:url HTTP/:http-version status=:status :res[content-length] - restime=:response-time ms",
  { stream, skip }
);

export default morganMiddleware;

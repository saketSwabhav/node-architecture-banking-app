import { isDev } from "../config/env.config.js";
import { ResponseMessages } from "../constants/responseMessages.js";
import logger from "../utils/logger.utils.js";


const errorHandler = (error) => {
  const { status = 500, message, field, validationError, devMessage } = error;

  const resMsg = ResponseMessages[status];
  const errorObj = {
    status,
    message: resMsg,
    error: {
      message,
      field,
    },
    devMessage,
    validationError,
  };

  if (!isDev) delete errorObj.devMessage;
  if (!errorObj.validationError) delete errorObj.validationError;
  return errorObj;
};

//Always have 4 parameters otherwise error handler wont work.
const errorHandlerMiddleware = (err, req, res, next) => {
  try {
    // logger.error("error: ", err);
    const error = errorHandler(err);
    res.status(error.status || 500).send(error);
  } catch (e) {
    logger.error(e);
  }
};

export default errorHandlerMiddleware;

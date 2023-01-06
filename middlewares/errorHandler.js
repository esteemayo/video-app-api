import { StatusCodes } from 'http-status-codes';

const handleCastErrorDB = (customError, err) => {
  customError.message = `Invalid ${err.path}: ${err.value}`;
  customError.statusCode = StatusCodes.BAD_REQUEST;
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const globalErrorHandler = (err, req, res, next) => {
  const customError = {
    status: err.status || 'error',
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went very wrong',
    stack: err.stack,
  };

  if (process.env.NODE_ENV === 'development') {
    if (err.name === 'CastError') handleCastErrorDB(customError, err);

    sendErrorDev(customError, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(customError, res);
  }
};

export default globalErrorHandler;

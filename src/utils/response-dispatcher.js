const constants = require('./constants');

const jsonResponse = (isError, message, data) => {
  /**
   * response is always bundled with isError flag
   * data flag contains either error message or a api call response
   */
  const response = { isError, message };
  if (data) {
    response.data = data;
  }
  return JSON.stringify(response);
};
/**
 * This function dispatches api responses
 * if business logic is executed then success response is passed with 200 response code
 */
const dispatch = (res, data) => {
  res.setHeader('Content-Type', constants.RES_HEADER.CONTENT_TYPE);
  res.setHeader('charset', constants.RES_HEADER.CHAR_SET);
  res.writeHead(constants.HTTP_STATUS.OK);
  res.write(jsonResponse(false, constants.HTTP_STATUS.OK, data));
  res.end();
};

/**
 * This function dispatches error api responses
 * in case of business validation fails error flag and message in response body is used to describe the result
 * 400 response code is passed to indicate error
 */
const dispatchError = (res, data) => {
  res.setHeader('Content-Type', constants.RES_HEADER.CONTENT_TYPE);
  res.setHeader('charset', constants.RES_HEADER.CHAR_SET);
  res.writeHead(constants.HTTP_STATUS.ERROR);
  res.write(jsonResponse(true, constants.HTTP_STATUS.ERROR, data));
  res.end();
};

const dispatch404 = (res) => {
  res.setHeader('Content-Type', constants.RES_HEADER.CONTENT_TYPE);
  res.setHeader('charset', constants.RES_HEADER.CHAR_SET);
  res.writeHead(constants.HTTP_STATUS.NOT_FOUND);
  res.write(jsonResponse(true, constants.MESSAGES.NOT_FOUND));
  res.end();
};

const dispatchPing = (res) => {
  res.setHeader('Content-Type', constants.RES_HEADER.CONTENT_TYPE);
  res.setHeader('charset', constants.RES_HEADER.CHAR_SET);
  res.writeHead(constants.HTTP_STATUS.OK);
  res.write(jsonResponse(false, constants.MESSAGES.PONG));
  res.end();
};

/**
 * This function dispatches parameter validation error responses
 * a 422 response code is passed in case where parameter is either invalid or not present
 */
const dispatchValidationError = (res, data) => {
  res.setHeader('Content-Type', constants.RES_HEADER.CONTENT_TYPE);
  res.setHeader('charset', constants.RES_HEADER.CHAR_SET);
  res.writeHead(constants.HTTP_STATUS.UNPROCESSABLE_ENTITY);
  res.write(jsonResponse(true, constants.HTTP_STATUS.UNPROCESSABLE_ENTITY, data));
  res.end();
};

module.exports = {
  dispatch,
  dispatch404,
  dispatchError,
  dispatchPing,
  dispatchValidationError,
};

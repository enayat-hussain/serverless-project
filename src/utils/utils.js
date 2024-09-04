const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const constants = require('./constants');

const generateSalt = async (length) => {
  return bcrypt.genSalt(length);
};

const encryptPassword = (password, salt) => {
  return bcrypt.hash(password, salt);
};

const validatePassword = (bodyPassword, password) => {
  return bcrypt.compare(bodyPassword, password);
};

const generateJWTToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '365d' });
};
const decodeJWTToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
const readHTMLFile = function (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};
const parseResult = (data) => JSON.parse(JSON.stringify(data));

// match clientId header with authUser's client id if user is not oxit
const clientIdHeaderCheckForAuthUser = (authorizedUser, clientIdInHeader) => {
  const userType = authorizedUser.user ? authorizedUser.type : null;
  const clientId = authorizedUser.userDetails ? authorizedUser.userDetails.clientId : authorizedUser.clientId;
  if (userType !== constants.USER_TYPE.OXIT && parseInt(clientIdInHeader) !== parseInt(clientId)) {
    return { message: constants.MESSAGES.CLIENT_ID_MISMATCH, error: true };
  } else return true;
};

module.exports = {
  generateSalt,
  encryptPassword,
  validatePassword,
  generateJWTToken,
  decodeJWTToken,
  readHTMLFile,
  parseResult,
  clientIdHeaderCheckForAuthUser,
};

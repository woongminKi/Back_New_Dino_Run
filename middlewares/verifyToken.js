const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { ERROR_MESSAGE, EXPIRED_TOKEN, MALFORMED_TOKEN } = require("../utils/tokenInfo");;

async function verifyToken(req, res,  next) {
  if (!req.body.header) {
    return next();
  }

  const accessToken = req.body.header.accessToken;
  const refreshToken = req.body.header.refreshToken;
  const accessTokenExpiresIn = req.body.header.accessTokenExpiresIn;
  const refreshTokenExpiresIn = req.body.header.refreshTokenExpiresIn;

  try {
    req.user = accessToken;
    res.cookie = "";

    next();
  } catch (err) {
    try {
      res.cookie = refreshToken;

      next();
    } catch (err) {
      if (err.message === ERROR_MESSAGE.jwtMalformed) {
        next(createError(403, EXPIRED_TOKEN));
      }

      if (err.message === ERROR_MESSAGE.jwtExpired) {
        next(createError(403, MALFORMED_TOKEN));
      }
    }
  }
}

module.exports = verifyToken;

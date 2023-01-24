const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { ERROR_MESSAGE, EXPIRED_TOKEN, MALFORMED_TOKEN } = require("../utils/tokenInfo");;

async function verifyToken(req, res,  next) {
  if (!req.body.headers) {
    return next();
  }

  const accessToken = req.body.headers.accessToken;
  const refreshToken = req.body.headers.refreshToken;
  const accessTokenExpiresIn = req.body.headers.accessTokenExpiresIn;
  const refreshTokenExpiresIn = req.body.headers.refreshTokenExpiresIn;

  try {
    req.user = {
      accessToken,
      refreshToken
    };
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

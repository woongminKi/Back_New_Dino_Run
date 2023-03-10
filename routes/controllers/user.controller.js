const createError = require("http-errors");
const User = require("../../models/User");
const { ALREADY_JOINED_USER, GET_USER_INFO_FAIL, USER_REGISTER_SUCCESS, USER_LOGIN_SUCCESS } = require("../../utils/constants");

exports.postLogin = async (req, res, next) => {
  try {
    res.status(201).send({ result: USER_LOGIN_SUCCESS });
  } catch(err) {
    next(createError(404, { message: GET_USER_INFO_FAIL }));
  }
};

exports.registerUser = async (req, res, next) => {
  const { userId, nickName, profileImage } = req.body;

  try {
    const user = await User.findOne({ id: userId }).lean();

    if (user) {
        return res.status(201).send({ result: ALREADY_JOINED_USER });
    }
    await User.create({ id: userId, nickName, profileImage, score: 0 });

    res.status(201).send({ result: USER_REGISTER_SUCCESS });
  } catch (err) {
    next(createError(404, { message: GET_USER_INFO_FAIL }));
  }
};

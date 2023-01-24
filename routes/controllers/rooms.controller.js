const createError = require("http-errors");
const Room = require("../../models/Room");
const { REGISTER_ROOM_INFO_SUCCESS, REGISTER_ROOM_INFO_FAIL, ALEADY_EXISTED_ROOM, GET_ROOM_INFO_FAIL } = require("../../utils/constants");

exports.registerRoom = async (req, res, next) => {
  const {title, userId, nickName, profileImage} = req.body;

  try {
    await Room.create(
      {
        author: {
          id: userId,
          nickName,
        },
        roomInfo: {
          title,
          participants: [{
            id: userId,
            nickName,
            score: 0,
            profileImage,
          }],
        },
      },
    );

    res.status(200).send({ result: REGISTER_ROOM_INFO_SUCCESS });
  } catch (err) {
    next(createError(404, { message: REGISTER_ROOM_INFO_FAIL }));
  }
};

exports.getRoomInfo = async (req, res, next) => {
  const { id } = req.params;
  const { accessauthorization, refreshauthorization } = req.headers;

  try {
    const roomArray = await Room.find().lean().exec();

    res.status(200).send(roomArray);
  } catch (err) {
    next(createError(404, { message: GET_ROOM_INFO_FAIL }));
  }
};

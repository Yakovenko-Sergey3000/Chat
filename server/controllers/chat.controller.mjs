import { validationResult } from "express-validator";
import { TYPE_ROOM } from "../enums/index.mjs";

class ChatController {
  getUserRooms = async (req, res) => {
    const rooms = await req.roomService.getRoomsByIdUser({
      userId: req.user.id,
    });

    res.json({ rooms });
  };
  createRoom = async (req, res) => {
    const error = validationResult(req);
    let room_id = null;
    const { typeRoom = TYPE_ROOM.direct, members = [] } = req.body;

    if (!error.isEmpty()) {
      return res.json(error.mapped());
    }

    if (typeRoom === TYPE_ROOM.direct && members.length > 1) {
      return res.json({
        error: `You can add just 1 user. If you want to add more, create a room with typeRoom: '${TYPE_ROOM.group}'`,
      });
    }

    if (typeRoom === TYPE_ROOM.group && members.length <= 1) {
      return res.json({
        error: `You cannot add just 1 user. If you want to add just 1 user, create a room with typeRoom: '${TYPE_ROOM.direct}'`,
      });
    }

    if (members.find((memberId) => memberId === req.user.user_id)) {
      return res.json({
        error: `You cannot add a user who is currently logged into the system with id ${req.user.user_id}`,
      });
    }

    try {
      if (typeRoom === TYPE_ROOM.direct) {
        const room = await req.roomService.checkRoomBetweenUsers({
          firstUserId: req.user.user_id,
          secondUserId: members[0],
        });

        if (room) {
          room_id = room.room_id;
        }
      }

      if (!room_id) {
        room_id = await req.roomService.create({
          owner: req.user,
          members,
          typeRoom,
        });
      }

      res.json({ room_id });
    } catch (e) {
      res.json({ error_message: e.response }).status(400);
    }
  };

  getRoomById = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.json(error.mapped());
    }

    try {
      const members = await req.roomService.getMembersByIdRoom({
        room_id: req.query.room_id,
      });

      res.json({ members });
    } catch (e) {
      res.json({ error_message: e.response }).status(400);
    }
  };
}

export default ChatController;

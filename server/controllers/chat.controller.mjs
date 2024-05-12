import { TYPE_ROOM } from "../enums/index.mjs";

class ChatController {
  getUserRooms = async (req, res) => {
    const rooms = await req.roomService.getRoomsByIdUser({
      userId: req.user.id,
    });

    for (let room of rooms) {
      const res = await req.messageService.getLastMessageByRoomId({
        roomId: room.id,
      });

      room["last_message"] = res;
    }

    res.json({ rooms });
  };
  createRoom = async (req, res) => {
    let room_id = null;
    const { typeRoom = TYPE_ROOM.direct, members = [] } = req.body;

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
    try {
      const [members, messages] = await Promise.all([
        req.roomService.getMembersByIdRoom({
          room_id: req.query.room_id,
        }),
        req.messageService
          .getMessageByRoomId({
            roomId: req.query.room_id,
          })
          .then(async (messages) => {
            const dontReadMessIds = messages.reduce((acc, mess) => {
              if (mess.user_id === req.user.id && mess.read === false) {
                acc.push(mess.id);
              }

              return acc;
            }, []);

            await req.messageService.changeReadStatus({
              user_id: req.user.id,
              messages_ids: dontReadMessIds,
            });

            return messages.map((mess) => ({ ...mess, read: true }));
          }),
      ]);

      res.json({ members, messages });
    } catch (e) {
      console.log(e);
      res.json({ error_message: e.response }).status(400);
    }
  };

  createMessage = async (req, res) => {
    const { room_id, message } = req.body;

    try {
      const room = await req.roomService.getRoomById({ room_id });

      if (!room) {
        return res.json({
          error: `Комната с id ${room_id} не найдена`,
        });
      }

      const messageRes = await req.messageService.create({
        user_id: req.user.id,
        room_id: room.id,
        message,
      });

      res.json(messageRes);
    } catch (e) {
      res.json({ error_message: e }).status(400);
      console.log(e);
    }
  };
}

export default ChatController;

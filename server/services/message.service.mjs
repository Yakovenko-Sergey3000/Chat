import { DB } from "../DBConfig/configDB.mjs";

class MessageService {
  constructor() {
    this.db = DB;
  }

  create = async ({ user_id, room_id, message }) =>
    await this.db("room_messages")
      .insert({
        user_id,
        room_id,
        message,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning(["id", "message"]);

  changeReadStatus = async ({ user_id, messages_ids }) =>
    await this.db("room_messages")
      .where("user_id", user_id)
      .whereIn("id", messages_ids)
      .update("read", true)
      .returning(["room_messages.*"]);

  getMessageByRoomId = async ({ roomId }) =>
    await this.db("room_messages")
      .leftJoin("rooms", "room_messages.room_id", "rooms.id")
      .where("rooms.room_id", roomId)
      .select("room_messages.*");

  getMessageByUserId = async ({ roomId, userId }) =>
    await this.db("room_messages")
      .where("room_id", roomId)
      .and.where("user_id", userId);

  getLastMessageByRoomId = async ({ roomId, userId }) =>
    await this.db("room_messages as rm")
      .where("room_id", roomId)
      .leftJoin("users as u", "rm.user_id", "u.id")
      .orderBy("rm.id", "desc")
      .select("rm.*", "u.email", "u.name")
      .first();
}

export default MessageService;

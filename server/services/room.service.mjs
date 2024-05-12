import { DB } from "../DBConfig/configDB.mjs";
import { v4 } from "uuid";
import { TYPE_ROOM } from "../enums/index.mjs";

class RoomService {
  constructor() {
    this.db = DB;
  }
  create = async ({ owner, members = [], typeRoom }) => {
    try {
      const users = await this.db("users").whereIn("user_id", members);

      if (!users.length) return;

      const nameRoom = users.map((user) => user.name).join(",");
      const timestamp = new Date();

      const [room] = await this.db("rooms")
        .insert({
          room_id: v4(),
          name: nameRoom,
          type_room: typeRoom,
          created_at: timestamp,
          updated_at: timestamp,
        })
        .returning(["id", "room_id"]);

      users.push(owner);

      await this.db("user_rooms").insert(
        users.map((user) => ({
          user_id: user.id,
          room_id: room.id,
        })),
      );

      return room.room_id;
    } catch (e) {
      throw new Error(e);
    }
  };

  getRoomById = async ({ room_id }) =>
    await this.db("rooms").where("rooms.room_id", room_id).first();

  checkRoomBetweenUsers = async ({ firstUserId, secondUserId }) =>
    await this.db("rooms")
      .leftJoin("user_rooms as usr1", "rooms.id", "usr1.room_id")
      .leftJoin("user_rooms as usr2", "rooms.id", "usr2.room_id")
      .leftJoin("users as u1", "u1.id", "usr1.user_id")
      .leftJoin("users as u2", "u2.id", "usr2.user_id")
      .where("rooms.type_room", TYPE_ROOM.direct)
      .where("u1.user_id", firstUserId)
      .andWhere("u2.user_id", secondUserId)
      .select("rooms.room_id")
      .first();

  getRoomsByIdUser = async ({ userId }) =>
    await this.db("rooms")
      .leftJoin("user_rooms", "user_rooms.room_id", "rooms.id")
      .where("user_rooms.user_id", userId)
      .select("rooms.id", "rooms.room_id", "rooms.type_room", "rooms.name");

  getMembersByIdRoom = async ({ room_id }) =>
    await this.db("rooms")
      .leftJoin("user_rooms", "user_rooms.room_id", "rooms.id")
      .leftJoin("users", "user_rooms.user_id", "users.id")
      .where("rooms.room_id", room_id)
      .select("users.user_id", "users.email", "users.city", "users.status");
}

export default RoomService;

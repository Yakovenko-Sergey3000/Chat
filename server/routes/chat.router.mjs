import { Router } from "express";
import { Authenticator } from "../lib/authenticator/index.mjs";
import UserService from "../services/user.service.mjs";
import ChatController from "../controllers/chat.controller.mjs";
import RoomService from "../services/room.service.mjs";
import CheckUser from "../middleware/check-user.mjs";
import {
  CreateRoomValidateSchema,
  GetRoomValidateSchema,
} from "./validation-routes/index.mjs";

const router = Router();
const chatController = new ChatController();

router.use(Authenticator.checkUser);
router.use(CheckUser);
router.use((req, _, next) => {
  req.userService = new UserService();
  req.userService = {};
  req.roomService = new RoomService();
  req.messageService = {};
  next();
});

router
  .get("/rooms", chatController.getUserRooms)
  .post("/create", CreateRoomValidateSchema, chatController.createRoom)
  .get("/get-room", GetRoomValidateSchema, chatController.getRoomById);

export default router;

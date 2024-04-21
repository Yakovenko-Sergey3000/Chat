import { Router } from "express";
import { Authenticator } from "../lib/authenticator/index.mjs";
import UserService from "../services/user.service.mjs";
import ChatController from "../controllers/chat.controller.mjs";
import RoomService from "../services/room.service.mjs";
import CheckUser from "../middleware/check-user.mjs";
import {
  CreateMessageValidateSchema,
  CreateRoomValidateSchema,
  GetRoomValidateSchema,
} from "./validation-routes/index.mjs";
import CheckErrors from "../middleware/check-errors.mjs";
import MessageService from "../services/message.service.mjs";

const router = Router();
const chatController = new ChatController();

router.use(Authenticator.checkUser);
router.use(CheckUser);

router.use((req, _, next) => {
  req.userService = new UserService();
  req.userService = {};
  req.roomService = new RoomService();
  req.messageService = new MessageService();
  next();
});

router
  .get("/rooms", chatController.getUserRooms)
  .post(
    "/create-room",
    CreateRoomValidateSchema,
    CheckErrors,
    chatController.createRoom,
  )
  .get(
    "/get-room",
    GetRoomValidateSchema,
    CheckErrors,
    chatController.getRoomById,
  )
  .post(
    "/create-message",
    CreateMessageValidateSchema,
    CheckErrors,
    chatController.createMessage,
  );

export default router;

import { Router } from "express";
import AuthRouter from "./auth.router.mjs";
import ChatRouter from "./chat.router.mjs";
import UserRouter from "./user.router.mjs";
import ContactsRouter from "./contacts.router.mjs";

const routers = Router();
routers.use("/api/auth", AuthRouter);
routers.use("/api/chat", ChatRouter);
routers.use("/api/contacts", ContactsRouter);

export default routers;

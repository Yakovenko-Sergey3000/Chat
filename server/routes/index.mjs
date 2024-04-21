import { Router } from "express";
import AuthRouter from "./auth.router.mjs";
import ChatRouter from "./chat.router.mjs";


const routers = Router();
routers.use("/api/auth", AuthRouter);
routers.use("/api/chat", ChatRouter);

export default routers;

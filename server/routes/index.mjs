import { Router } from "express";
import AuthRouter from "./auth.router.mjs";

const routers = Router();
routers.use("/api/auth", AuthRouter);

export default routers;

import { DB } from "../DBConfig/configDB.mjs";
export const DbMiddleware = (req, res, next) => {
  req.db = DB;
  next();
};

import { checkSchema } from "express-validator";
import { TYPE_ROOM } from "../../enums/index.mjs";

const existMess = "Обязательный параметр";
export const CreateRoomValidateSchema = checkSchema({
  members: {
    exists: {
      errorMessage: existMess,
    },
    isArray: {
      errorMessage: "Должен быть массивом",
    },
  },
  typeRoom: {
    exists: {
      errorMessage: existMess,
    },
    isIn: {
      options: [[TYPE_ROOM.group, TYPE_ROOM.direct]],
      errorMessage: `Вариант может быть только ${TYPE_ROOM.direct} или ${TYPE_ROOM.group}`,
    },
  },
});

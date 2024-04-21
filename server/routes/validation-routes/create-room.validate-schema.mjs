import { checkSchema } from "express-validator";
import { TYPE_ROOM, VALIDATE_ROUTE_MESSAGE } from "../../enums/index.mjs";
export const CreateRoomValidateSchema = checkSchema({
  members: {
    exists: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.exists,
    },
    isArray: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.isArray,
    },
  },
  typeRoom: {
    exists: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.exists,
    },
    isIn: {
      options: [[TYPE_ROOM.group, TYPE_ROOM.direct]],
      errorMessage: `Вариант может быть только ${TYPE_ROOM.direct} или ${TYPE_ROOM.group}`,
    },
  },
});

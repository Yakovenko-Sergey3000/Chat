import { checkSchema } from "express-validator";
import { VALIDATE_ROUTE_MESSAGE } from "../../enums/index.mjs";

export const GetRoomValidateSchema = checkSchema({
  room_id: {
    exists: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.exists,
    },
  },
});

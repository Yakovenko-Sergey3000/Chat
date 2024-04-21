import { checkSchema } from "express-validator";

export const GetRoomValidateSchema = checkSchema({
  room_id: {
    exists: {
      errorMessage: "Обязательный параметр",
    },
  },
});

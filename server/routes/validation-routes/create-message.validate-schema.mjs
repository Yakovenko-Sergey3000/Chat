import { checkSchema } from "express-validator";
import { VALIDATE_ROUTE_MESSAGE } from "../../enums/index.mjs";

export const CreateMessageValidateSchema = checkSchema({
  room_id: {
    exists: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.exists,
    },
    notEmpty: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.notEmpty,
    },
    isUUID: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.isUUID,
    },
  },
  message: {
    exists: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.exists,
    },
    trim: {},
    notEmpty: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.notEmpty,
    },
  },
});

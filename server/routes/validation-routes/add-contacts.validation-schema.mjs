import { checkSchema } from "express-validator";
import { VALIDATE_ROUTE_MESSAGE } from "../../enums/index.mjs";

export const AddContactsValidationSchema = checkSchema({
  contacts: {
    exists: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.exists,
    },
    isArray: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.isArray,
    },
    isUUID: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.isUUID,
    },
    notEmpty: {
      errorMessage: VALIDATE_ROUTE_MESSAGE.notEmpty,
    },
  },
});

import {checkSchema} from "express-validator";
export const RegistrationUserValidateSchema = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Некорректный email",
    },
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: "Пароль должен быть минимум 6 символов",
    },
  },
});
import { UseFormSetError } from "react-hook-form";

type FormError = {
  fields: object;
  handler: UseFormSetError<any>;
  changeKey?: any;
};
export const FormError = ({ fields, handler, changeKey = {} }: FormError) => {
  Object.entries(fields).forEach(([key, value]: any) => {
    if (changeKey[key]) {
      handler(changeKey[key], { message: value.msg });
    } else {
      handler(key, { message: value.msg });
    }
  });
};

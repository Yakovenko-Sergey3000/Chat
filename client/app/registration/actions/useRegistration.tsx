"use client";
import { useForm } from "react-hook-form";
import { ApiRegistration } from "@/app/registration/api";
import { FormError } from "@/app/chat/_components/Shared/Utils/FormError";

export type RegistrationType = {
  email: string;
  password: string;
  name: string;
  passwordConfirm: string;
};
export default function useRegistration() {
  const { control, handleSubmit, reset, setError } = useForm<RegistrationType>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (data.password.trim() !== data.passwordConfirm.trim()) {
      return setError("passwordConfirm", { message: "Пароли не совпадают" });
    }

    try {
      const res = await ApiRegistration(data);

      if (res.status === 200) {
        reset();
      }
    } catch (e: any) {
      FormError({ fields: e.response.data, handler: setError });
    }
  });

  return {
    control,
    onSubmit,
  };
}

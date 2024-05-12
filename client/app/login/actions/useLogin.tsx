"use client";
import { useForm } from "react-hook-form";
import { ApiLogin } from "@/app/login/api";
import { FormError } from "@/app/chat/_components/Shared/Utils/FormError";
import { PagesPaths } from "@/app/chat/_components/Shared/Paths/PagesPaths";
import { useRouter } from "next/navigation";

export type LoginType = {
  email: string;
  password: string;
};
export default function useLogin() {
  const router = useRouter();
  const { control, handleSubmit, setError, reset } = useForm<LoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data: LoginType) => {
    try {
      const res = await ApiLogin(data);

      if (res.status === 200) {
        reset();
        router.push(PagesPaths.chat);
      }
    } catch (e: any) {
      FormError({
        fields: e.response.data,
        handler: setError,
        changeKey: {
          error_message: "email",
        },
      });
      console.log(e.response);
    }
  });

  return {
    control,
    onSubmit,
  };
}

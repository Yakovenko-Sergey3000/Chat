import UiInput from "@/app/chat/_components/Shared/Ui/UiInput";
import UiButton from "@/app/chat/_components/Shared/Ui/UiButton";
import { Control, Controller } from "react-hook-form";
import { LoginType } from "@/app/login/actions/useLogin";

export default function Form({
  control,
  onSubmit,
}: {
  control: Control<LoginType>;
  onSubmit: () => void;
}) {
  return (
    <form autoComplete={"off"} onSubmit={onSubmit}>
      <div className={"w-full flex flex-col gap-5"}>
        <Controller
          control={control}
          name={"email"}
          rules={{
            required: { value: true, message: "Пожалуйста заполните поле" },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <p className={"text-2xl text-white font-light mb-2"}>Email</p>
              <UiInput
                inputProps={{
                  placeholder: "Введите email...",
                  value,
                  onChange,
                }}
              />
              <div className={"mt-2 w-1/8 text-end"}>
                <p className={"max-w-3xl text-red-500"}>{error?.message}</p>
              </div>
            </div>
          )}
        />
        <Controller
          control={control}
          name={"password"}
          rules={{
            required: { value: true, message: "Пожалуйста заполните поле" },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <p className={"text-2xl text-white font-light mb-2"}>Пароль</p>
              <UiInput
                inputProps={{
                  type: "password",
                  placeholder: "Введите Пароль...",
                  value,
                  onChange,
                }}
              />
              <div className={"mt-2 w-1/8 text-end"}>
                <p className={"max-w-3xl text-red-500"}>{error?.message}</p>
              </div>
            </div>
          )}
        />

        <UiButton
          buttonProps={{
            type: "submit",
          }}
        >
          Войти
        </UiButton>
      </div>
    </form>
  );
}

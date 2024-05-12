import UiInput from "@/app/chat/_components/Shared/Ui/UiInput";
import UiButton from "@/app/chat/_components/Shared/Ui/UiButton";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { RegistrationType } from "@/app/registration/actions/useRegistration";

export default function Form({
  control,
  onSubmit,
}: {
  control: Control<RegistrationType>;
  onSubmit: () => void;
}) {
  return (
    <form autoComplete={"off"} onSubmit={onSubmit}>
      <div className={"w-full flex flex-col gap-5"}>
        <Controller
          control={control}
          name={"name"}
          rules={{
            required: { value: true, message: "Пожалуйста заполните поле" },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className={"relative"}>
              <p className={"text-2xl text-white font-light mb-2"}>Имя</p>
              <UiInput
                inputProps={{
                  type: "text",
                  autoComplete: "off",
                  placeholder: "Введите Имя...",
                  value,
                  onChange,
                }}
              />
              <div
                className={
                  "mt-2 w-1/8 text-end absolute right-0 bottom-[-25px]"
                }
              >
                <p className={"max-w-3xl text-red-500"}>{error?.message}</p>
              </div>
            </div>
          )}
        />

        <Controller
          control={control}
          name={"email"}
          rules={{
            required: { value: true, message: "Пожалуйста заполните поле" },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className={"relative"}>
              <p className={"text-2xl text-white font-light mb-2"}>Email</p>
              <UiInput
                inputProps={{
                  type: "text",
                  autoComplete: "off",
                  placeholder: "Введите email...",
                  value,
                  onChange,
                }}
              />
              <div
                className={
                  "mt-2 w-1/8 text-end absolute right-0 bottom-[-25px]"
                }
              >
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
            <div className={"relative"}>
              <p className={"text-2xl text-white font-light mb-2"}>Пароль</p>
              <UiInput
                inputProps={{
                  type: "password",
                  autoComplete: "new-password",
                  placeholder: "Введите Пароль...",
                  value,
                  onChange,
                }}
              />
              <div
                className={
                  "mt-2 w-1/8 text-end absolute right-0 bottom-[-25px]"
                }
              >
                <p className={"max-w-3xl text-red-500"}>{error?.message}</p>
              </div>
            </div>
          )}
        />

        <Controller
          control={control}
          name={"passwordConfirm"}
          rules={{
            required: { value: true, message: "Пожалуйста заполните поле" },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <p className={"text-2xl text-white font-light mb-2"}>
                Повторите пароль
              </p>
              <UiInput
                inputProps={{
                  type: "password",
                  autoComplete: "new-password",
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
          Регистрация
        </UiButton>
      </div>
    </form>
  );
}

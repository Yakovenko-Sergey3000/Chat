import UiInput from "@/components/Shared/Ui/UiInput";
import UiButton from "@/components/Shared/Ui/UiButton";

export default function Form() {
  return (
    <div className={"w-full flex flex-col gap-5"}>
      <div>
        <p className={"text-2xl text-white font-light mb-2"}>Имя</p>
        <UiInput
          inputProps={{
            type: "text",
            autoComplete: "off",
            placeholder: "Введите Имя...",
          }}
        />
      </div>
      <div>
        <p className={"text-2xl text-white font-light mb-2"}>Email</p>
        <UiInput
          inputProps={{
            type: "text",
            autoComplete: "off",
            placeholder: "Введите email...",
          }}
        />
      </div>
      <div>
        <p className={"text-2xl text-white font-light mb-2"}>Пароль</p>
        <UiInput
          inputProps={{
            type: "password",
            autoComplete: "new-password",
            placeholder: "Введите Пароль...",
          }}
        />
      </div>
      <div>
        <p className={"text-2xl text-white font-light mb-2"}>
          Повторите пароль
        </p>
        <UiInput
          inputProps={{
            type: "password",
            autoComplete: "new-password",
            placeholder: "Введите Пароль...",
          }}
        />
      </div>
      <UiButton
        buttonProps={{
          type: "submit",
        }}
      >
        Войти
      </UiButton>
    </div>
  );
}

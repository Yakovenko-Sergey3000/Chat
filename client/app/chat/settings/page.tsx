import UiAvatar from "@/app/chat/_components/Shared/Ui/UiAvatar";
import { GrUserSettings } from "react-icons/gr";
import { IoColorPaletteOutline } from "react-icons/io5";

export default function Page() {
  const SETTING_ITEMS = [
    {
      label: "Настройки профиля",
      icon: <GrUserSettings size={20} />,
      onClick: () => {},
    },
    {
      label: "Оформление",
      icon: <IoColorPaletteOutline size={25} />,
      onClick: () => {},
    },
  ];

  return (
    <div className={"text-white"}>
      <div className={"mt-5 text-center text-2xl font-bold mx-auto"}>
        Настройки
      </div>
      <div className={"mt-8 w-[120px] h-[120px] mx-auto"}>
        <UiAvatar
          src={
            "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6561d83088410d6f4a17dfff_6561ee656e6f8b6285a47d48/scale_1200"
          }
        />
      </div>
      <p className={"mt-4 text-center"}>sergeyyskovenko15@gmail.com</p>

      <div className={"mt-8 flex flex-col gap-2"}>
        {SETTING_ITEMS.map((data) => (
          <div
            key={data.label}
            className={
              "flex gap-4 items-center p-2 bg-slate-300/10 hover:bg-slate-100/20 active:bg-slate-100/30 cursor-pointer rounded-md select-none"
            }
          >
            {data.icon}
            {data.label}
          </div>
        ))}
      </div>
    </div>
  );
}

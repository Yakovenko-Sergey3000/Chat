import UiAvatar from "@/app/chat/_components/Shared/Ui/UiAvatar";
import { GrUserSettings } from "react-icons/gr";
import { IoColorPaletteOutline } from "react-icons/io5";

export default function Page() {
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
      <div className={"mt-14 flex flex-col gap-2"}>
        <div
          className={
            "flex gap-4 items-center p-2 hover:bg-slate-100/10 cursor-pointer rounded-md"
          }
        >
          <GrUserSettings size={20} />
          Настройки профиля
        </div>
        <div
          className={
            "flex gap-4 items-center p-2 hover:bg-slate-100/10 cursor-pointer rounded-md"
          }
        >
          <IoColorPaletteOutline size={25} />
          Оформление
        </div>
      </div>
    </div>
  );
}

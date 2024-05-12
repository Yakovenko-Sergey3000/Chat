"use client";
import { useSearchParams } from "next/navigation";
import { IoIosChatbubbles, IoIosContacts, IoIosSettings } from "react-icons/io";
import Link from "next/link";
import { PagesPaths } from "@/app/chat/_components/Shared/Paths/PagesPaths";
import UiTooltip from "@/app/chat/_components/Shared/Ui/UiTooltip";

export default function Navigation() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room-id");

  const generateLink = (path: string) =>
    roomId ? `${path}?room-id=${roomId}` : path;

  return (
    <div
      className={
        "flex text-white py-2 gap-2.5 justify-between px-4 items-center"
      }
    >
      <div className={"flex gap-2.5"}>
        <Link href={generateLink(PagesPaths.messages)}>
          <UiTooltip label={"Сообщения"}>
            <IoIosChatbubbles
              size={35}
              className={"p-1 hover:bg-black/20 rounded"}
            />
          </UiTooltip>
        </Link>
        <Link href={generateLink(PagesPaths.messages)}>
          <UiTooltip label={"Контакты"}>
            <IoIosContacts
              size={35}
              className={"p-1 hover:bg-black/20 rounded"}
            />
          </UiTooltip>
        </Link>
      </div>

      <Link href={generateLink(PagesPaths.settings)} className={"p-1  rounded"}>
        <UiTooltip label={"Настройки"}>
          <IoIosSettings
            size={35}
            className={"p-1 hover:bg-black/20 rounded"}
          />
        </UiTooltip>
      </Link>
    </div>
  );
}

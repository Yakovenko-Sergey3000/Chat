"use client";
import ApiGetRooms from "@/app/chat/messages/api";
import UiAvatar from "@/app/chat/_components/Shared/Ui/UiAvatar";
const DayJS = dynamic(() => import("react-dayjs"), {
  ssr: false,
});
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import UiInput from "@/app/chat/_components/Shared/Ui/UiInput";
import { IoSearchOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

export default function Page() {
  const pathName = usePathname();
  const router = useRouter();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      const { rooms }: { rooms: [] } = await ApiGetRooms();

      if (rooms) {
        setRooms(rooms);
      }
    };

    getRooms();
  }, []);

  return (
    <div className={"text-black"}>
      <div className={"px-4 relative"}>
        <div className={"absolute top-2 left-6"}>
          <IoSearchOutline />
        </div>
        <UiInput
          className={"h-2 rounded-xl pl-8 text-base"}
          inputProps={{
            placeholder: "Search...",
          }}
        />
      </div>
      <div className={"mt-4 flex flex-col gap-2.5"}>
        {rooms.map((data) => (
          <div
            key={data.id}
            className={`flex bg-white py-[15px] px-[17px] rounded-md items-start justify-between cursor-pointer
             hover:bg-white/90 active:bg-white/85`}
            onClick={() => router.push(`${pathName}?room-id=${data.room_id}`)}
          >
            <div className={"flex gap-3 items-center"}>
              <div className={"w-[73px] h-[73px]"}>
                <UiAvatar />
              </div>
              <div>
                <p className={"font-bold text-[18px]"}>{data.name}</p>
                <p className={"text-[18px] select-none"}>
                  {data.last_message.message}
                </p>
              </div>
            </div>
            <div className={"text-center"}>
              <DayJS format={"DD:MM"}>{data.last_message.created_at}</DayJS>
              <div
                className={
                  "mt-2 ml-2 w-[27px] h-[27px] flex justify-center items-center bg-black text-white rounded-full"
                }
              >
                2
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

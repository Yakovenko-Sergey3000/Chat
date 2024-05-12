"use client";
import { useSearchParams } from "next/navigation";
import NotRoot from "@/app/chat/_components/Room/Ui/Not-Root";

export default function Room() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room-id");

  return (
    <div
      className={
        "text-white w-full h-full bg-[url('/assets/bg-room.png')] rounded-r-xl bg-cover"
      }
    >
      {!roomId ? <NotRoot /> : roomId}
    </div>
  );
}

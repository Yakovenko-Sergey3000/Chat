"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function MessagesList() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room-id");

  return (
    <div className={"text-white"}>
      <Link href={`/chat/settings${roomId ? `?room-id=${roomId}` : ""}`}>
        Setting
      </Link>
    </div>
  );
}

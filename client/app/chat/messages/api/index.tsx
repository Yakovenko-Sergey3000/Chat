"use server";
import ServerFetcher from "@/app/chat/_components/Shared/Utils/ServerFetcher";

export default async function ApiGetRooms(): Promise<{ rooms: [] }> {
  try {
    const res = await ServerFetcher("/api/chat/rooms");

    const { rooms } = await res.json();

    return {
      rooms,
    };
  } catch (e) {
    console.log(e);
  }
}

import clsx from "clsx";
import { FaUserLarge } from "react-icons/fa6";
import Image from "next/image";

export default function UiAvatar({
  className,
  src,
}: {
  className?: string;
  src?: string;
}) {
  return (
    <div
      className={clsx(
        "flex justify-center items-center w-full h-full relative bg-gray-100 text-gray-500  rounded-full",
        className,
      )}
    >
      {src ? (
        <Image
          fill
          src={src}
          alt={"avatar"}
          className={"object-cover rounded-full"}
        />
      ) : (
        <FaUserLarge size={50} />
      )}
    </div>
  );
}

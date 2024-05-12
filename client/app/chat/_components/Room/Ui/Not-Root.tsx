import Image from "next/image";

export default function NotRoot() {
  return (
    <div className={"mt-14 w-full  flex justify-center"}>
      <Image
        width={267}
        height={110}
        src={"/assets/logo.svg"}
        alt={"Your Chat Logo"}
      />
    </div>
  );
}

"use client";
import Form from "@/app/login/components/Form";
import AnotherLinks from "@/app/login/components/AnotherLinks";

export default function Page() {
  return (
    <div
      className={
        "container px-4 lg:w-[400px] md:w-[350px] w-full h-full mx-auto flex flex-col justify-center"
      }
    >
      <Form />
      <div className={"w-9/12 mt-10 mx-auto bg-black h-1"} />
      <div className={"mt-8"}>
        <AnotherLinks />
      </div>
    </div>
  );
}

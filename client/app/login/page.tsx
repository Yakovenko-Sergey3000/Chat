"use client";
import Form from "@/app/login/components/Form";
import AnotherLinks from "@/app/login/components/AnotherLinks";
import useLogin from "@/app/login/actions/useLogin";

export default function Page() {
  const { control, onSubmit } = useLogin();
  return (
    <div
      className={
        "container h-full px-4 lg:w-[400px] md:w-[350px] w-full mx-auto flex flex-col justify-center"
      }
    >
      <Form control={control} onSubmit={onSubmit} />
      <div className={"w-9/12 mt-10 mx-auto bg-black h-1"} />
      <div className={"mt-8"}>
        <AnotherLinks />
      </div>
    </div>
  );
}

"use client";
import Form from "@/app/registration/components/Form";
import AnotherLinks from "@/app/registration/components/AnotherLinks";
import useRegistration from "@/app/registration/actions/useRegistration";

export default function Page() {
  const { control, onSubmit } = useRegistration();

  return (
    <div
      className={
        "container h-full px-4 lg:w-[400px] md:w-[350px] w-full h-full mx-auto flex flex-col justify-center"
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

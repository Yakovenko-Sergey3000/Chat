import { PagesPaths } from "@/app/chat/_components/Shared/Paths/PagesPaths";

export default function AnotherLinks() {
  return (
    <div className={"text-xl text-white text-center flex flex-col gap-2"}>
      <div>
        <a href={PagesPaths.login} className={"underline underline-offset-4"}>
          Войти
        </a>
      </div>
    </div>
  );
}

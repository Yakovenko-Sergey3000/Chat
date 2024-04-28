import { PagesPaths } from "@/components/Shared/Paths/pages-paths";

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

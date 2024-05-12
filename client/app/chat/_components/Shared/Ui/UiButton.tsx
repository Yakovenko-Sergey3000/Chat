import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type UiButtonType = {
  children?: string;
  className?: string;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};
export default function UiButton({
  children,
  className,
  buttonProps,
}: UiButtonType) {
  return (
    <button
      className={clsx(
        "w-full h-[60px] bg-black text-white text-lg rounded-xl hover:bg-gradient-to-r from-black from-60% to-white",
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

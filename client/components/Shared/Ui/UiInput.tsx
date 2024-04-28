"use client";
import clsx from "clsx";
import { InputHTMLAttributes } from "react";

type UiInputType = {
  className?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

export default function UiInput({ inputProps, className }: UiInputType) {
  return (
    <input
      {...inputProps}
      className={clsx(
        "w-full rounded-2xl p-4 h-[65px] px-6 text-xl focus:outline-0",
        className,
      )}
    />
  );
}

import { ReactNode, useRef } from "react";

export default function UiTooltip({
  children,
  label,
  delay = 100,
}: {
  children?: ReactNode;
  label?: string;
  delay?: number;
}) {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      className={"group relative inline-block h-fit"}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left - 20 + "px";
      }}
    >
      {children}
      {label && (
        <span
          ref={tooltipRef}
          className={`bg-slate-900/60 p-2 rounded text-sm absolute invisible group-hover:visible delay-${delay}
        opacity-0 top-full mt-2 group-hover:opacity-100 whitespace-nowrap`}
        >
          {label}
        </span>
      )}
    </div>
  );
}

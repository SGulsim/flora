"use client";

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: QuantityStepperProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  const isSmall = size === "sm";
  const height = isSmall ? "h-9" : "h-12";
  const btn = isSmall ? "w-7 h-7 text-base" : "w-8 h-8 text-lg";
  const num = isSmall ? "w-7 text-xs" : "w-8 text-sm";

  return (
    <div
      className={`inline-flex items-center border border-neutral-200 rounded-full bg-white ${height} px-2 select-none`}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Уменьшить"
        className={`${btn} flex items-center justify-center text-neutral-700 hover:text-neutral-900 disabled:text-neutral-300 disabled:cursor-not-allowed transition-colors font-medium`}
      >
        −
      </button>
      <span
        className={`${num} text-center font-medium text-neutral-900 min-w-[2rem] tabular-nums`}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Увеличить"
        className={`${btn} flex items-center justify-center text-neutral-700 hover:text-neutral-900 disabled:text-neutral-300 disabled:cursor-not-allowed transition-colors font-medium`}
      >
        +
      </button>
    </div>
  );
}

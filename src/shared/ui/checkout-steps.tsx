import { Iconify } from "./icon";

const STEPS = ["Корзина", "Оформление", "Оплата", "Готово"];

interface CheckoutStepsProps {
  current: 0 | 1 | 2 | 3;
}

export function CheckoutSteps({ current }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  done
                    ? "bg-neutral-900 text-white"
                    : active
                    ? "bg-neutral-900 text-white ring-4 ring-neutral-900/10"
                    : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {done ? (
                  <Iconify icon="solar:check-read-linear" width={14} height={14} />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-xs hidden sm:block ${
                  active ? "text-neutral-900 font-medium" : "text-neutral-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-6 sm:w-12 mx-0.5 sm:mx-1 mb-4 sm:mb-5 flex-shrink-0 transition-all ${
                  i < current ? "bg-neutral-900" : "bg-neutral-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUIZ_STEPS } from "@/features/quiz/quiz-steps";
import { BOUQUETS } from "@/shared/lib/mock-data";
import { Iconify } from "@/shared/ui/icon";

type QuizAnswers = Record<string, string | string[]>;

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const currentStepData = QUIZ_STEPS[step];
  const isLastStep = step === QUIZ_STEPS.length - 1;

  const selectedValue = answers[currentStepData?.id];

  const handleSelect = (optionId: string) => {
    if (!currentStepData) return;
    const stepConfig = currentStepData as { id: string; options: { id: string }[]; multi?: boolean };
    if (stepConfig.id === "color" && stepConfig.multi) {
      const prev = (answers.color as string[]) ?? [];
      const next = prev.includes(optionId)
        ? prev.filter((x) => x !== optionId)
        : [...prev, optionId];
      setAnswers((a) => ({ ...a, color: next }));
    } else {
      setAnswers((a) => ({ ...a, [stepConfig.id]: optionId }));
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      router.push("/catalog");
      return;
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step === 0) {
      router.push("/");
    } else {
      setStep((s) => s - 1);
    }
  };

  const isSelected = (optionId: string) => {
    const val = answers[currentStepData?.id];
    if (Array.isArray(val)) return val.includes(optionId);
    return val === optionId;
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="text-center mb-12">
        <span className="text-xs font-medium text-neutral-500 tracking-widest uppercase mb-3 block">
          Шаг {step + 1} из {QUIZ_STEPS.length}
        </span>
        <div className="w-full max-w-xs mx-auto h-1 bg-neutral-100 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-neutral-900 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / QUIZ_STEPS.length) * 100}%` }}
          />
        </div>
        <h1 className="text-3xl font-medium tracking-tight text-neutral-900 mb-4">
          {currentStepData?.title}
        </h1>
        <p className="text-sm text-neutral-500">{currentStepData?.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {currentStepData?.options.map((opt: { id: string; label: string; icon?: string; desc?: string }) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className={`p-6 rounded-2xl flex flex-col items-center gap-3 text-center transition-all ${
              isSelected(opt.id)
                ? "border-2 border-neutral-900 bg-neutral-50"
                : "border border-neutral-200 bg-white hover:border-neutral-300"
            }`}
          >
            {opt.icon && (
              <Iconify
                icon={opt.icon}
                width={28}
                height={28}
                className={isSelected(opt.id) ? "text-neutral-900" : "text-neutral-400"}
              />
            )}
            <span
              className={`text-sm font-medium ${
                isSelected(opt.id) ? "text-neutral-900" : "text-neutral-600"
              }`}
            >
              {opt.label}
            </span>
            {opt.desc && (
              <span className="text-xs text-neutral-400">{opt.desc}</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center border-t border-neutral-100 pt-8">
        <button
          onClick={handleBack}
          className="text-sm font-medium text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          Назад
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-all"
        >
          {isLastStep ? "Смотреть подборку" : "Далее"}
        </button>
      </div>
    </main>
  );
}

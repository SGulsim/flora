import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Iconify } from "@/shared/ui/icon";
import { SUBSCRIPTION_PLANS } from "@/shared/lib/mock-data";

const meta: Meta = {
  title: "UI/SubscriptionCard",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

function PlanCard({
  plan,
}: {
  plan: (typeof SUBSCRIPTION_PLANS)[number];
}) {
  return (
    <div
      className={`p-8 rounded-[2rem] bg-white relative ${
        plan.popular
          ? "border-2 border-neutral-900"
          : "border border-neutral-200 hover:border-neutral-300 transition-colors"
      }`}
      style={{ width: 280 }}
    >
      {plan.popular && (
        <div className="absolute top-0 right-8 -translate-y-1/2 bg-neutral-900 text-white text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full">
          Популярно
        </div>
      )}
      <h3 className="text-xl font-medium text-neutral-900 mb-2">{plan.name}</h3>
      <p className="text-xs text-neutral-500 mb-6 h-8">{plan.description}</p>
      <div className="text-2xl font-semibold tracking-tight text-neutral-900 mb-6">
        от {plan.price.toLocaleString("ru-RU")} ₽{" "}
        <span className="text-sm font-normal text-neutral-400">/ раз</span>
      </div>
      <ul className="space-y-3 mb-8 text-sm text-neutral-600">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <Iconify icon="solar:check-circle-linear" width={18} height={18} className="text-neutral-900 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <button
        className={`block w-full py-3 text-sm font-medium rounded-full text-center transition-all ${
          plan.popular
            ? "bg-neutral-900 text-white hover:bg-neutral-800"
            : "bg-neutral-50 text-neutral-900 hover:bg-neutral-100"
        }`}
      >
        {plan.popular ? "Оформить" : "Выбрать"}
      </button>
    </div>
  );
}

export const Classic: Story = {
  render: () => <PlanCard plan={SUBSCRIPTION_PLANS[0]} />,
};

export const Premium: Story = {
  render: () => <PlanCard plan={SUBSCRIPTION_PLANS[1]} />,
};

export const BothPlans: Story = {
  render: () => (
    <div className="flex gap-6 pt-6">
      {SUBSCRIPTION_PLANS.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  ),
};

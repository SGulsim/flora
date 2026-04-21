import React, { useEffect, useRef } from "react";
import type { Decorator } from "@storybook/react";
import { useCart } from "@/shared/context/cart-context";
import { BOUQUETS } from "@/shared/lib/mock-data";

export const MOCK_USER = {
  id: "1",
  email: "demo@flora.ru",
  name: "Анна",
  phone: "+7 (999) 123-45-67",
};

/** Decorator that pre-populates the cart with 2 bouquets */
export const withCartItems: Decorator = (Story) => (
  <CartSeeder>
    <Story />
  </CartSeeder>
);

function CartSeeder({ children }: { children: React.ReactNode }) {
  const { addItem } = useCart();
  const seeded = useRef(false);

  useEffect(() => {
    if (!seeded.current) {
      seeded.current = true;
      BOUQUETS.slice(0, 2).forEach((b) => {
        addItem({ bouquetId: b.id, name: b.name, price: b.price, image: b.image });
      });
    }
  }, []);

  return <>{children}</>;
}

/** Decorator that sets a logged-in user in localStorage before render */
export const withLoggedInUser: Decorator = (Story) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("flora_user", JSON.stringify(MOCK_USER));
  }
  return <Story />;
};

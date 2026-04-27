import { test, expect } from "@playwright/test";

test.describe("Подписка", () => {
  test("страница тарифов и кнопки оформления", async ({ page }) => {
    await page.goto("/subscription");
    await expect(
      page.getByRole("heading", { name: "Цветочная подписка" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Оформить подписку" }).first()
    ).toBeVisible();
  });
});

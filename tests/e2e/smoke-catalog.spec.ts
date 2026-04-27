import { test, expect } from "@playwright/test";

test.describe("Каталог и карточка товара", () => {
  test("каталог загружается и переход на страницу букета", async ({ page }) => {
    await page.goto("/catalog", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Каталог" })).toBeVisible();
    const toProduct = page.getByRole("link", { name: /утренний туман/i });
    await expect(toProduct).toBeVisible();
    await Promise.all([
      page.waitForURL(/\/catalog\/utrennij-tuman/, { timeout: 20_000 }),
      toProduct.click(),
    ]);
    await expect(page.getByRole("button", { name: /в корзину/i })).toBeVisible();
  });
});

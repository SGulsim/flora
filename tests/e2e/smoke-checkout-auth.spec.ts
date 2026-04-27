import { test, expect } from "@playwright/test";

test.describe("Оформление заказа и вход", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        for (const k of Object.keys(localStorage)) {
          if (k.startsWith("flora")) localStorage.removeItem(k);
        }
      } catch {
        // ignore
      }
    });
  });

  test("checkout без входа ведёт на страницу входа", async ({ page }) => {
    await page.goto("/checkout", { waitUntil: "domcontentloaded" });
    await page.waitForURL(/\/login/, { timeout: 25_000 });
    await expect(page.getByRole("heading", { name: "Вход" })).toBeVisible();
  });
});

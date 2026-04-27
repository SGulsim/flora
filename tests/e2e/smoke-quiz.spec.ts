import { test, expect } from "@playwright/test";

test.describe("Квиз подбора", () => {
  test("квиз открывается на первом шаге", async ({ page }) => {
    await page.goto("/quiz");
    await expect(page.getByRole("heading", { name: "Какой повод?" })).toBeVisible();
    await expect(page.getByText("Шаг 1 из", { exact: false })).toBeVisible();
  });
});

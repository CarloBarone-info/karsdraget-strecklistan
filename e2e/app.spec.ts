import { expect, test } from "@playwright/test";

test("dashboard loads", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Strecklistan",
    }),
  ).toBeVisible();

  await expect(page.getByText("#593").first()).toBeVisible();
  await expect(page.getByText("Nori").first()).toBeVisible();
});

test("members can be found by member number", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("searchbox", { name: "Sök medlem" }).fill("593");

  await expect(page.getByText("Nori").first()).toBeVisible();
  await expect(page.getByText("GO")).toHaveCount(0);
});

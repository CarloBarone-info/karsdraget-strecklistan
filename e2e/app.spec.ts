import { expect, test } from "@playwright/test";

test("application loads", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Get started",
    }),
  ).toBeVisible();
});

test("counter can be incremented", async ({ page }) => {
  await page.goto("/");

  const counter = page.getByRole("button", {
    name: "Count is 0",
  });

  await counter.click();

  await expect(
    page.getByRole("button", {
      name: "Count is 1",
    }),
  ).toBeVisible();
});

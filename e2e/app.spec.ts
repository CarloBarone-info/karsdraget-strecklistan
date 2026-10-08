import { expect, test } from "@playwright/test";

test("member can log in and see their profile", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Fortsätt som #593 Nori" }).click();

  await expect(page.getByRole("heading", { name: "Nori" })).toBeVisible();
  await expect(page.getByText("Kårsetten")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Mina streck" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Mina registreringar" }),
  ).toBeVisible();
});

test("member can streck for someone else and undo it", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Fortsätt som #593 Nori" }).click();

  await page.getByLabel("Vem dricker?").selectOption("560");
  await page.getByRole("button", { name: /Cider/ }).click();

  await expect(page.getByRole("status")).toContainText(
    "Cider streckat på #560 Slickepott.",
  );

  const undoButton = page.getByRole("button", {
    name: "Ångra Cider för #560 Slickepott",
  });
  await expect(undoButton).toBeVisible();

  await undoButton.click();
  await expect(undoButton).toHaveCount(0);
});

test("admin credentials open the full dashboard", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Användarnamn").fill("Klubbis");
  await page.getByLabel("Lösenord").fill("kd1958");
  await page.getByRole("button", { name: "Logga in som admin" }).click();

  await expect(
    page.getByRole("heading", { name: "Senaste strecken" }),
  ).toBeVisible();
});

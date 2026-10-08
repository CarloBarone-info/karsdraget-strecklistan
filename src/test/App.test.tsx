import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import App from "../App";

async function loginAsMember() {
  const user = userEvent.setup();

  render(<App />);

  await user.click(
    screen.getByRole("button", {
      name: "Fortsätt som #593 Nori",
    }),
  );

  return user;
}

describe("App", () => {
  it("starts on the login page", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "Strecklistan",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Fortsätt som #593 Nori",
      }),
    ).toBeInTheDocument();
  });

  it("shows the member profile and keeps the full dashboard private", async () => {
    await loginAsMember();

    expect(
      screen.getByRole("heading", {
        name: "Nori",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Kårsetten")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Mina streck",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Mina registreringar",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: "Senaste strecken",
      }),
    ).not.toBeInTheDocument();
  });

  it("defaults the streck controls to the logged-in member", async () => {
    await loginAsMember();

    expect(screen.getByLabelText("Vem dricker?")).toHaveValue("593");
    expect(screen.getByText("Du streckar för dig själv.")).toBeInTheDocument();
  });

  it("strecks immediately and records the action in the user's history", async () => {
    const user = await loginAsMember();

    expect(screen.getByText("1 streck")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Cider/ }));

    expect(screen.getByText("2 streck")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Cider streckat på #593 Nori.",
    );

    const registrationSection = screen
      .getByRole("heading", { name: "Mina registreringar" })
      .closest("section");

    if (!registrationSection) {
      throw new Error("Could not find registration history");
    }

    expect(within(registrationSection).getByText("Cider")).toBeInTheDocument();
    expect(within(registrationSection).getByText("#593 Nori")).toBeInTheDocument();
  });

  it("can streck for another member without exposing that member's consumption history", async () => {
    const user = await loginAsMember();

    await user.selectOptions(screen.getByLabelText("Vem dricker?"), "560");
    await user.click(screen.getByRole("button", { name: /Öl/ }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Öl streckat på #560 Slickepott.",
    );
    expect(screen.getByText("1 streck")).toBeInTheDocument();

    const registrationSection = screen
      .getByRole("heading", { name: "Mina registreringar" })
      .closest("section");

    if (!registrationSection) {
      throw new Error("Could not find registration history");
    }

    expect(
      within(registrationSection).getByText("#560 Slickepott"),
    ).toBeInTheDocument();
  });

  it("can undo a streck registered by the logged-in user", async () => {
    const user = await loginAsMember();

    await user.click(screen.getByRole("button", { name: /Cider/ }));
    expect(screen.getByText("2 streck")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Ångra Cider för #593 Nori",
      }),
    );

    expect(screen.getByText("1 streck")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: "Ångra Cider för #593 Nori",
      }),
    ).not.toBeInTheDocument();
  });

  it("rejects invalid admin credentials", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(
      screen.getByRole("textbox", {
        name: "Användarnamn",
      }),
      "Klubbis",
    );
    await user.type(screen.getByLabelText("Lösenord"), "wrong-password");
    await user.click(
      screen.getByRole("button", {
        name: "Logga in som admin",
      }),
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Fel användarnamn eller lösenord.",
    );
  });

  it("shows the full dashboard after an admin login", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(
      screen.getByRole("textbox", {
        name: "Användarnamn",
      }),
      "Klubbis",
    );
    await user.type(screen.getByLabelText("Lösenord"), "kd1958");
    await user.click(
      screen.getByRole("button", {
        name: "Logga in som admin",
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "Senaste strecken",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Klubbmästaren")).toBeInTheDocument();
  });

  it("returns to login after logout", async () => {
    const user = await loginAsMember();

    await user.click(
      screen.getByRole("button", {
        name: "Logga ut",
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "Strecklistan",
      }),
    ).toBeInTheDocument();
  });
});

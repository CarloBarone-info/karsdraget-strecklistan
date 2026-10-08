import { render, screen } from "@testing-library/react";
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
      screen.queryByRole("heading", {
        name: "Senaste strecken",
      }),
    ).not.toBeInTheDocument();
  });

  it("defaults the streck form to the logged-in member", async () => {
    await loginAsMember();

    expect(screen.getByLabelText("Vem dricker?")).toHaveValue("593");
    expect(screen.getByText("Du streckar för dig själv.")).toBeInTheDocument();
  });

  it("adds a streck to the logged-in member's personal history", async () => {
    const user = await loginAsMember();

    expect(screen.getByText("1 streck")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Cider/ }));
    await user.click(
      screen.getByRole("button", {
        name: "Lägg till streck",
      }),
    );

    expect(screen.getByText("2 streck")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Cider tillagd för #593 Nori.",
    );
  });

  it("can streck for another member without exposing that member's history", async () => {
    const user = await loginAsMember();

    await user.selectOptions(screen.getByLabelText("Vem dricker?"), "560");
    await user.click(screen.getByRole("button", { name: /Öl/ }));
    await user.click(
      screen.getByRole("button", {
        name: "Lägg till streck",
      }),
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "Öl tillagd för #560 Slickepott.",
    );
    expect(screen.getByText("1 streck")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: /Slickepott/,
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

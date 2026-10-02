import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import App from "../App";

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

  it("shows only the member view after a member login", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Fortsätt som #593 Nori",
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "Nori",
      }),
    ).toBeInTheDocument();

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
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("button", {
        name: "Fortsätt som #593 Nori",
      }),
    );
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

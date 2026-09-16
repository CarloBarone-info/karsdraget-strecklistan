import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("App", () => {
  it("renders the dashboard", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "Strecklistan",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("#593")).toBeInTheDocument();
    expect(screen.getAllByText("Nori").length).toBeGreaterThan(0);
  });

  it("filters members by nickname", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByRole("searchbox", { name: "Sök medlem" }), "Nori");

    expect(screen.getAllByText("Nori").length).toBeGreaterThan(0);
    expect(screen.queryByText("Kexet")).not.toBeInTheDocument();
  });

  it("filters members by member number", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByRole("searchbox", { name: "Sök medlem" }), "#1");

    expect(screen.getByText("GO")).toBeInTheDocument();
    expect(screen.queryByText("Nori")).not.toBeInTheDocument();
  });
});

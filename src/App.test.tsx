import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import App from "./App";

function getMemberDirectory() {
  return screen.getByRole("heading", { name: "Medlemmar" }).closest("section");
}

describe("App", () => {
  it("renders the dashboard", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "Strecklistan",
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByText("#593").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Nori").length).toBeGreaterThan(0);
  });

  it("filters members by nickname", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(
      screen.getByRole("searchbox", { name: "Sök medlem" }),
      "Nori",
    );

    const directory = getMemberDirectory();
    expect(directory).not.toBeNull();

    const memberDirectory = within(directory!);

    expect(memberDirectory.getByText("Nori")).toBeInTheDocument();
    expect(memberDirectory.queryByText("Toddy")).not.toBeInTheDocument();
  });

  it("filters members by member number", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(
      screen.getByRole("searchbox", { name: "Sök medlem" }),
      "#560",
    );

    const directory = getMemberDirectory();
    expect(directory).not.toBeNull();

    const memberDirectory = within(directory!);

    expect(memberDirectory.getByText("Slickepott")).toBeInTheDocument();
    expect(memberDirectory.queryByText("Nori")).not.toBeInTheDocument();
  });

  it("shows an empty state when no member matches", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(
      screen.getByRole("searchbox", { name: "Sök medlem" }),
      "definitely-not-a-member",
    );

    expect(
      screen.getByText("Ingen medlem matchar sökningen."),
    ).toBeInTheDocument();
  });
});

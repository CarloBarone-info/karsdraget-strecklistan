import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import MemberDirectory from "../../components/MemberDirectory/MemberDirectory";
import type { Member } from "../../types/domain";

const members: Member[] = [
  { id: 12, nickname: "Trumpeten", active: true },
  { id: 345, nickname: "Bananen", active: true },
  { id: 567, nickname: "Korken", active: true },
  { id: 890, nickname: "Sovaren", active: false },
];

function renderDirectory() {
  const onSelectMember = vi.fn();

  render(
    <MemberDirectory members={members} onSelectMember={onSelectMember} />,
  );

  const section = screen
    .getByRole("heading", { name: "Medlemmar" })
    .closest("section");

  if (!section) {
    throw new Error("Could not find member directory");
  }

  return {
    directory: within(section),
    onSelectMember,
  };
}

describe("MemberDirectory", () => {
  it("shows active members only", () => {
    const { directory } = renderDirectory();

    expect(directory.getByText("Trumpeten")).toBeInTheDocument();
    expect(directory.getByText("Bananen")).toBeInTheDocument();
    expect(directory.getByText("Korken")).toBeInTheDocument();
    expect(directory.queryByText("Sovaren")).not.toBeInTheDocument();
  });

  it("filters members by nickname", async () => {
    const user = userEvent.setup();
    const { directory } = renderDirectory();

    await user.type(
      screen.getByRole("searchbox", { name: "Sök medlem" }),
      "bananen",
    );

    expect(directory.getByText("Bananen")).toBeInTheDocument();
    expect(directory.queryByText("Trumpeten")).not.toBeInTheDocument();
    expect(directory.queryByText("Korken")).not.toBeInTheDocument();
  });

  it("filters members by member number", async () => {
    const user = userEvent.setup();
    const { directory } = renderDirectory();

    await user.type(
      screen.getByRole("searchbox", { name: "Sök medlem" }),
      "#567",
    );

    expect(directory.getByText("Korken")).toBeInTheDocument();
    expect(directory.queryByText("Trumpeten")).not.toBeInTheDocument();
    expect(directory.queryByText("Bananen")).not.toBeInTheDocument();
  });

  it("shows an empty state when no member matches", async () => {
    const user = userEvent.setup();
    renderDirectory();

    await user.type(
      screen.getByRole("searchbox", { name: "Sök medlem" }),
      "absolutely-no-such-person",
    );

    expect(
      screen.getByText("Ingen medlem matchar sökningen."),
    ).toBeInTheDocument();
  });

  it("passes the selected member id to the parent", async () => {
    const user = userEvent.setup();
    const { directory, onSelectMember } = renderDirectory();

    await user.click(directory.getByRole("button", { name: /Bananen/ }));

    expect(onSelectMember).toHaveBeenCalledOnce();
    expect(onSelectMember).toHaveBeenCalledWith(345);
  });
});

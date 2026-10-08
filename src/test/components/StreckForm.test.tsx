import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import StreckForm from "../../components/StreckForm/StreckForm";
import type { Member, Product } from "../../types/domain";

const members: Member[] = [
  {
    id: 593,
    nickname: "Nori",
    sectionIds: ["karsetten"],
    active: true,
  },
];

const products: Product[] = [
  {
    id: "beer",
    name: "Öl",
    priceOre: 2000,
    active: true,
  },
];

afterEach(() => {
  vi.useRealTimers();
});

describe("StreckForm", () => {
  it("hides the confirmation after five seconds", () => {
    vi.useFakeTimers();

    render(
      <StreckForm
        currentMember={members[0]}
        members={members}
        products={products}
        onAddStreck={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Öl/ }));
    fireEvent.click(screen.getByRole("button", { name: "Lägg till streck" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Öl tillagd för #593 Nori.",
    );

    act(() => {
      vi.advanceTimersByTime(4999);
    });
    expect(screen.getByRole("status")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

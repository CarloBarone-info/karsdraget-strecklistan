import { useState } from "react";

import type { SessionUser } from "../../auth/authTypes";
import PersonalStreckHistory from "../../components/PersonalStreckHistory/PersonalStreckHistory";
import RegisteredStreckHistory from "../../components/RegisteredStreckHistory/RegisteredStreckHistory";
import StreckForm from "../../components/StreckForm/StreckForm";
import UserProfile from "../../components/UserProfile/UserProfile";
import {
  mockMembers,
  mockProducts,
  mockSections,
  mockStrecks,
} from "../../data/mockData";
import type { Member, Product, Streck } from "../../types/domain";
import "./MemberPage.css";

type MemberPageProps = {
  user: SessionUser;
  onLogout: () => void;
};

function MemberPage({ user, onLogout }: MemberPageProps) {
  const [strecks, setStrecks] = useState(mockStrecks);

  const member =
    mockMembers.find((candidate) => candidate.id === user.memberId) ?? null;

  if (!member) {
    return (
      <main className="member-page__error">
        <h1>Medlemsprofil saknas</h1>
        <p>Det gick inte att hitta medlemmen som hör till kontot.</p>
        <button type="button" onClick={onLogout}>
          Logga ut
        </button>
      </main>
    );
  }

  function addStreck(memberId: Member["id"], product: Product) {
    const newStreck: Streck = {
      id: Date.now(),
      memberId,
      productId: product.id,
      priceOre: product.priceOre,
      createdAt: new Date().toISOString(),
      createdByUserId: user.id,
    };

    setStrecks((current) => [newStreck, ...current]);
  }

  function undoStreck(streckId: Streck["id"]) {
    setStrecks((current) => {
      const target = current.find((streck) => streck.id === streckId);

      if (!target || target.createdByUserId !== user.id) {
        return current;
      }

      return current.filter((streck) => streck.id !== streckId);
    });
  }

  return (
    <div className="member-page">
      <UserProfile
        member={member}
        sections={mockSections}
        onLogout={onLogout}
      />

      <main className="member-page__main">
        <StreckForm
          currentMember={member}
          members={mockMembers}
          products={mockProducts}
          onAddStreck={addStreck}
        />

        <RegisteredStreckHistory
          userId={user.id}
          members={mockMembers}
          products={mockProducts}
          strecks={strecks}
          onUndoStreck={undoStreck}
        />

        <PersonalStreckHistory
          member={member}
          products={mockProducts}
          strecks={strecks}
        />
      </main>
    </div>
  );
}

export default MemberPage;

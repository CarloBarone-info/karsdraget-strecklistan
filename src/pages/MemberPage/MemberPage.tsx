import { useState } from "react";

import type { SessionUser } from "../../auth/authTypes";
import PersonalStreckHistory from "../../components/PersonalStreckHistory/PersonalStreckHistory";
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
    };

    setStrecks((current) => [newStreck, ...current]);
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

import { useEffect, useRef, useState } from "react";

import type { Member, Product } from "../../types/domain";
import { formatCurrency } from "../../utils/dashboard";
import "./StreckForm.css";

type StreckFormProps = {
  currentMember: Member;
  members: Member[];
  products: Product[];
  onAddStreck: (memberId: Member["id"], product: Product) => void;
};

type Confirmation = {
  id: number;
  text: string;
};

function StreckForm({
  currentMember,
  members,
  products,
  onAddStreck,
}: StreckFormProps) {
  const [selectedMemberId, setSelectedMemberId] = useState(currentMember.id);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const confirmationId = useRef(0);

  const activeMembers = members.filter((member) => member.active);
  const activeProducts = products.filter((product) => product.active);
  const selectedMember =
    activeMembers.find((member) => member.id === selectedMemberId) ??
    currentMember;

  useEffect(() => {
    if (!confirmation) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setConfirmation(null);
    }, 2500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [confirmation]);

  function addStreck(product: Product) {
    onAddStreck(selectedMember.id, product);

    confirmationId.current += 1;
    setConfirmation({
      id: confirmationId.current,
      text: `${product.name} streckat på #${selectedMember.id} ${selectedMember.nickname}.`,
    });
  }

  return (
    <section className="streck-form" aria-labelledby="add-streck-title">
      <div className="streck-form__heading">
        <p>Snabbregistrering</p>
        <h2 id="add-streck-title">Lägg till streck</h2>
      </div>

      <label className="streck-form__member">
        <span>Vem dricker?</span>
        <select
          value={selectedMemberId}
          onChange={(event) => {
            setSelectedMemberId(Number(event.target.value));
            setConfirmation(null);
          }}
        >
          {activeMembers.map((member) => (
            <option key={member.id} value={member.id}>
              #{member.id} {member.nickname}
              {member.id === currentMember.id ? " (du)" : ""}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="streck-form__products">
        <legend>Vad dricks?</legend>
        <p className="streck-form__hint">
          Tryck på en dryck för att strecka direkt.
        </p>

        <div className="streck-form__product-grid">
          {activeProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => addStreck(product)}
            >
              <span>{product.name}</span>
              <strong>{formatCurrency(product.priceOre)}</strong>
            </button>
          ))}
        </div>
      </fieldset>

      <p className="streck-form__recipient">
        {selectedMember.id === currentMember.id
          ? "Du streckar för dig själv."
          : `Du streckar för #${selectedMember.id} ${selectedMember.nickname}.`}
      </p>

      {confirmation && (
        <p
          key={confirmation.id}
          className="streck-form__toast"
          role="status"
          aria-live="polite"
        >
          {confirmation.text}
        </p>
      )}
    </section>
  );
}

export default StreckForm;

import { useEffect, useState, type FormEvent } from "react";

import type { Member, Product } from "../../types/domain";
import { formatCurrency } from "../../utils/dashboard";
import "./StreckForm.css";

type StreckFormProps = {
  currentMember: Member;
  members: Member[];
  products: Product[];
  onAddStreck: (memberId: Member["id"], product: Product) => void;
};

function StreckForm({
  currentMember,
  members,
  products,
  onAddStreck,
}: StreckFormProps) {
  const [selectedMemberId, setSelectedMemberId] = useState(currentMember.id);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const activeMembers = members.filter((member) => member.active);
  const activeProducts = products.filter((product) => product.active);
  const selectedMember =
    activeMembers.find((member) => member.id === selectedMemberId) ??
    currentMember;
  const selectedProduct =
    activeProducts.find((product) => product.id === selectedProductId) ?? null;

  useEffect(() => {
    if (!confirmation) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setConfirmation(null);
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [confirmation]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedProduct) {
      return;
    }

    onAddStreck(selectedMember.id, selectedProduct);
    setConfirmation(
      `${selectedProduct.name} tillagd för #${selectedMember.id} ${selectedMember.nickname}.`,
    );
    setSelectedProductId(null);
  }

  return (
    <section className="streck-form" aria-labelledby="add-streck-title">
      <div className="streck-form__heading">
        <p>Snabbregistrering</p>
        <h2 id="add-streck-title">Lägg till streck</h2>
      </div>

      <form onSubmit={handleSubmit}>
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
          <div className="streck-form__product-grid">
            {activeProducts.map((product) => {
              const isSelected = product.id === selectedProductId;

              return (
                <button
                  key={product.id}
                  type="button"
                  className={isSelected ? "is-selected" : undefined}
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setConfirmation(null);
                  }}
                >
                  <span>{product.name}</span>
                  <strong>{formatCurrency(product.priceOre)}</strong>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="streck-form__footer">
          <p>
            {selectedMember.id === currentMember.id
              ? "Du streckar för dig själv."
              : `Du streckar för #${selectedMember.id} ${selectedMember.nickname}.`}
          </p>
          <button
            className="button-primary streck-form__submit"
            type="submit"
            disabled={!selectedProduct}
          >
            Lägg till streck
          </button>
        </div>

        {confirmation && (
          <p className="streck-form__confirmation" role="status">
            {confirmation}
          </p>
        )}
      </form>
    </section>
  );
}

export default StreckForm;

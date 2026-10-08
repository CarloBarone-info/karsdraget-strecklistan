import type { Member, Product, Streck } from "../../types/domain";
import { formatCurrency } from "../../utils/dashboard";
import "./RegisteredStreckHistory.css";

type RegisteredStreckHistoryProps = {
  userId: string;
  members: Member[];
  products: Product[];
  strecks: Streck[];
  onUndoStreck: (streckId: Streck["id"]) => void;
};

function RegisteredStreckHistory({
  userId,
  members,
  products,
  strecks,
  onUndoStreck,
}: RegisteredStreckHistoryProps) {
  const registeredStrecks = strecks.filter(
    (streck) => streck.createdByUserId === userId,
  );
  const membersById = new Map(members.map((member) => [member.id, member]));
  const productsById = new Map(
    products.map((product) => [product.id, product]),
  );

  return (
    <section
      className="registered-streck-history"
      aria-labelledby="registered-strecks-title"
    >
      <div className="registered-streck-history__heading">
        <div>
          <p>Din aktivitet</p>
          <h2 id="registered-strecks-title">Mina registreringar</h2>
        </div>
        <span>{registeredStrecks.length} registrerade</span>
      </div>

      {registeredStrecks.length > 0 ? (
        <ol>
          {registeredStrecks.map((streck) => {
            const member = membersById.get(streck.memberId);
            const product = productsById.get(streck.productId);
            const memberLabel = member
              ? `#${member.id} ${member.nickname}`
              : `#${streck.memberId}`;
            const productLabel = product?.name ?? "Okänd produkt";

            return (
              <li key={streck.id}>
                <div className="registered-streck-history__details">
                  <strong>{productLabel}</strong>
                  <span>{memberLabel}</span>
                </div>

                <span className="registered-streck-history__price">
                  {formatCurrency(streck.priceOre)}
                </span>

                <button
                  type="button"
                  onClick={() => onUndoStreck(streck.id)}
                  aria-label={`Ångra ${productLabel} för ${memberLabel}`}
                >
                  Ångra
                </button>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="registered-streck-history__empty">
          Du har inte registrerat några streck ännu.
        </p>
      )}
    </section>
  );
}

export default RegisteredStreckHistory;

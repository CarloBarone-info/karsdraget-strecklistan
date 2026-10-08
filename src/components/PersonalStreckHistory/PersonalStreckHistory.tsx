import type { Member, Product, Streck } from "../../types/domain";
import { formatCurrency } from "../../utils/dashboard";
import "./PersonalStreckHistory.css";

type PersonalStreckHistoryProps = {
  member: Member;
  products: Product[];
  strecks: Streck[];
};

function PersonalStreckHistory({
  member,
  products,
  strecks,
}: PersonalStreckHistoryProps) {
  const memberStrecks = strecks.filter(
    (streck) => streck.memberId === member.id,
  );
  const totalOre = memberStrecks.reduce(
    (sum, streck) => sum + streck.priceOre,
    0,
  );
  const productsById = new Map(
    products.map((product) => [product.id, product]),
  );

  return (
    <section
      className="personal-streck-history"
      aria-labelledby="my-strecks-title"
    >
      <div className="personal-streck-history__heading">
        <div>
          <p>Endast synligt för dig</p>
          <h2 id="my-strecks-title">Mina streck</h2>
        </div>

        <div className="personal-streck-history__summary">
          <span>{memberStrecks.length} streck</span>
          <strong>{formatCurrency(totalOre)}</strong>
        </div>
      </div>

      {memberStrecks.length > 0 ? (
        <ol>
          {memberStrecks.map((streck) => (
            <li key={streck.id}>
              <span>
                {productsById.get(streck.productId)?.name ?? "Okänd produkt"}
              </span>
              <strong>{formatCurrency(streck.priceOre)}</strong>
            </li>
          ))}
        </ol>
      ) : (
        <p>Du har inga streck ännu.</p>
      )}
    </section>
  );
}

export default PersonalStreckHistory;

import type { SessionUser } from "../../auth/authTypes";
import { mockProducts, mockStrecks } from "../../data/mockData";
import { formatCurrency } from "../../utils/dashboard";
import "./MemberPage.css";

type MemberPageProps = {
  user: SessionUser;
  onLogout: () => void;
};

function MemberPage({ user, onLogout }: MemberPageProps) {
  const memberStrecks = mockStrecks.filter(
    (streck) => streck.memberId === user.memberId,
  );
  const totalOre = memberStrecks.reduce(
    (sum, streck) => sum + streck.priceOre,
    0,
  );
  const productsById = new Map(
    mockProducts.map((product) => [product.id, product]),
  );

  return (
    <div className="member-page">
      <header className="member-page__header">
        <div>
          <p className="member-page__eyebrow">Min profil</p>
          <h1>{user.nickname}</h1>
          {user.memberId !== undefined && (
            <p className="member-page__number">Medlem #{user.memberId}</p>
          )}
        </div>

        <button type="button" onClick={onLogout}>
          Logga ut
        </button>
      </header>

      <main className="member-page__main">
        <section className="member-page__summary" aria-label="Min översikt">
          <article>
            <span>Mina streck</span>
            <strong>{memberStrecks.length}</strong>
          </article>
          <article>
            <span>Totalt</span>
            <strong>{formatCurrency(totalOre)}</strong>
          </article>
        </section>

        <section className="member-page__history" aria-labelledby="my-strecks">
          <div className="member-page__section-heading">
            <p>Endast synligt för dig</p>
            <h2 id="my-strecks">Mina streck</h2>
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
      </main>
    </div>
  );
}

export default MemberPage;

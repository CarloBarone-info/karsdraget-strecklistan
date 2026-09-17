import type { Member, Product, Streck } from "../../types/domain";
import { formatCurrency } from "../../utils/dashboard";
import "./RecentStrecks.css";

type RecentStrecksProps = {
  members: Member[];
  products: Product[];
  strecks: Streck[];
};

const timeFormatter = new Intl.DateTimeFormat("sv-SE", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Stockholm",
});

function RecentStrecks({ members, products, strecks }: RecentStrecksProps) {
  const membersById = new Map(members.map((member) => [member.id, member]));
  const productsById = new Map(products.map((product) => [product.id, product]));

  return (
    <section className="dashboard-panel" aria-labelledby="recent-strecks-title">
      <div className="dashboard-panel__heading">
        <div>
          <p className="dashboard-panel__eyebrow">Nu händer det</p>
          <h2 id="recent-strecks-title">Senaste strecken</h2>
        </div>
      </div>

      <ol className="recent-strecks">
        {strecks.map((streck) => {
          const member = membersById.get(streck.memberId);
          const product = productsById.get(streck.productId);

          if (!member || !product) {
            return null;
          }

          return (
            <li className="recent-strecks__item" key={streck.id}>
              <div className="recent-strecks__member">
                <span className="recent-strecks__number">#{member.id}</span>
                <strong>{member.nickname}</strong>
              </div>

              <div className="recent-strecks__purchase">
                <span>{product.name}</span>
                <strong>{formatCurrency(streck.priceOre)}</strong>
              </div>

              <time dateTime={streck.createdAt}>
                {timeFormatter.format(new Date(streck.createdAt))}
              </time>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default RecentStrecks;

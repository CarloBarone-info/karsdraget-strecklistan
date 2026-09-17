import type { Member, Product } from "../../types/domain";
import { formatCurrency } from "../../utils/dashboard";
import "./StreckPanel.css";

type StreckPanelProps = {
  member: Member;
  products: Product[];
  onAddStreck: (product: Product) => void;
  onClose: () => void;
};

function StreckPanel({
  member,
  products,
  onAddStreck,
  onClose,
}: StreckPanelProps) {
  return (
    <section className="streck-panel" aria-labelledby="streck-panel-title">
      <div className="streck-panel__header">
        <div>
          <p className="streck-panel__member-number">#{member.id}</p>
          <h2 id="streck-panel-title">{member.nickname}</h2>
        </div>

        <button
          type="button"
          className="streck-panel__close"
          onClick={onClose}
          aria-label={`Close ${member.nickname}`}
        >
          ×
        </button>
      </div>

      <p className="streck-panel__prompt">What are we putting on the tab?</p>

      <div className="streck-panel__products">
        {products
          .filter((product) => product.active)
          .map((product) => (
            <button
              key={product.id}
              type="button"
              className="streck-panel__product"
              onClick={() => onAddStreck(product)}
            >
              <span>{product.name}</span>
              <strong>{formatCurrency(product.priceOre)}</strong>
            </button>
          ))}
      </div>
    </section>
  );
}

export default StreckPanel;

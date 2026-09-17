import "./AppHeader.css";

type AppHeaderProps = {
  firstMemberId: number;
  latestMemberId: number;
};

function AppHeader({ firstMemberId, latestMemberId }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="app-header__eyebrow">Kårsdraget &amp; Kårsetten</p>
        <h1 className="app-header__title">Strecklistan</h1>
      </div>

      <div className="app-header__member-range" aria-label="Medlemsnummer">
        <span>Medlemsnummer</span>
        <strong>
          #{firstMemberId}–#{latestMemberId}
        </strong>
      </div>
    </header>
  );
}

export default AppHeader;

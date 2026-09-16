import AppHeader from "../../components/AppHeader/AppHeader";
import MemberDirectory from "../../components/MemberDirectory/MemberDirectory";
import RecentStrecks from "../../components/RecentStrecks/RecentStrecks";
import StatCard from "../../components/StatCard/StatCard";
import { mockMembers, mockProducts, mockStrecks } from "../../data/mockData";
import { formatCurrency, getDashboardStats } from "../../utils/dashboard";
import "./DashboardPage.css";

function DashboardPage() {
  const stats = getDashboardStats(mockStrecks);
  const activeMembers = mockMembers.filter((member) => member.active);
  const memberIds = activeMembers.map((member) => member.id);

  return (
    <div className="dashboard-page">
      <AppHeader
        firstMemberId={Math.min(...memberIds)}
        latestMemberId={Math.max(...memberIds)}
      />

      <main className="dashboard-page__main">
        <section className="dashboard-page__stats" aria-label="Dagens översikt">
          <StatCard
            label="Streck idag"
            value={String(stats.streckCount)}
            detail="Registrerade köp i mockdatan"
          />
          <StatCard
            label="Summa idag"
            value={formatCurrency(stats.totalSpendOre)}
            detail="Totalt värde av dagens streck"
          />
          <StatCard
            label="Aktiva idag"
            value={String(stats.activeMembers)}
            detail="Medlemmar med minst ett streck"
          />
        </section>

        <div className="dashboard-page__content">
          <RecentStrecks
            members={mockMembers}
            products={mockProducts}
            strecks={mockStrecks}
          />
          <MemberDirectory members={mockMembers} />
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;

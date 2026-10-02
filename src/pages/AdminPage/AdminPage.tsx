import type { SessionUser } from "../../auth/authTypes";
import DashboardPage from "../DashboardPage/DashboardPage";
import "./AdminPage.css";

type AdminPageProps = {
  user: SessionUser;
  onLogout: () => void;
};

function AdminPage({ user, onLogout }: AdminPageProps) {
  return (
    <div className="admin-page">
      <div className="admin-page__session">
        <p>
          <span>Admin</span>
          <strong>{user.nickname}</strong>
        </p>
        <button type="button" onClick={onLogout}>
          Logga ut
        </button>
      </div>

      <DashboardPage />
    </div>
  );
}

export default AdminPage;

import { useState } from "react";

import type { SessionUser } from "./auth/authTypes";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MemberPage from "./pages/MemberPage/MemberPage";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);

  if (!currentUser) {
    return (
      <div className="app">
        <LoginPage onLogin={setCurrentUser} />
      </div>
    );
  }

  function logout() {
    setCurrentUser(null);
  }

  return (
    <div className="app">
      {currentUser.role === "admin" ? (
        <AdminPage user={currentUser} onLogout={logout} />
      ) : (
        <MemberPage user={currentUser} onLogout={logout} />
      )}
    </div>
  );
}

export default App;

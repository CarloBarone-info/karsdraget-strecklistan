import { useState, type FormEvent } from "react";

import type { SessionUser } from "../../auth/authTypes";
import { loginAsAdmin, mockMemberUser } from "../../auth/mockAuth";
import "./LoginPage.css";

type LoginPageProps = {
  onLogin: (user: SessionUser) => void;
};

function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleAdminLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = loginAsAdmin(username, password);

    if (!user) {
      setError("Fel användarnamn eller lösenord.");
      return;
    }

    setError(null);
    onLogin(user);
  }

  function handleMemberLogin() {
    setError(null);
    onLogin(mockMemberUser);
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <p className="login-card__eyebrow">Kårsdraget &amp; Kårsetten</p>
        <h1 id="login-title">Strecklistan</h1>
        <p className="login-card__intro">
          Frontendprototyp för medlems- och admininloggning.
        </p>

        <div className="login-card__member">
          <h2>Medlem</h2>
          <p>
            Använd ett tillfälligt testkonto tills riktig inloggning finns på
            plats.
          </p>
          <button
            className="login-card__member-button"
            type="button"
            onClick={handleMemberLogin}
          >
            Fortsätt som #593 Nori
          </button>
        </div>

        <div className="login-card__divider" aria-hidden="true">
          <span>eller</span>
        </div>

        <form className="login-card__form" onSubmit={handleAdminLogin}>
          <h2>Klubbmästare</h2>

          <label>
            <span>Användarnamn</span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
            />
          </label>

          <label>
            <span>Lösenord</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p className="login-card__error" role="alert">
              {error}
            </p>
          )}

          <button className="button-primary login-card__submit" type="submit">
            Logga in som admin
          </button>
        </form>

        <p className="login-card__warning">
          Den här inloggningen är endast en frontendmockup och ska ersättas av
          riktig autentisering innan sidan används skarpt.
        </p>
      </section>
    </main>
  );
}

export default LoginPage;

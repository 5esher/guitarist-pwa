import { PropsWithChildren, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NIGHT_MODE_KEY = "guitarist_night_mode";
const LARGE_TEXT_KEY = "guitarist_large_text";

const AppShell = ({ children }: PropsWithChildren) => {
  const [nightMode, setNightMode] = useState(() => localStorage.getItem(NIGHT_MODE_KEY) === "1");
  const [largeText, setLargeText] = useState(() => localStorage.getItem(LARGE_TEXT_KEY) === "1");

  useEffect(() => {
    document.body.classList.toggle("night-mode", nightMode);
    localStorage.setItem(NIGHT_MODE_KEY, nightMode ? "1" : "0");
  }, [nightMode]);

  useEffect(() => {
    document.body.classList.toggle("large-text", largeText);
    localStorage.setItem(LARGE_TEXT_KEY, largeText ? "1" : "0");
  }, [largeText]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-brand">
          <Link to="/">Guitarist PWA</Link>
        </div>
        <nav className="app-nav">
          <Link to="/">Песни</Link>
          <Link to="/chords">Аккорды</Link>
          <Link to="/setlists">Сет-листы</Link>
          <Link to="/profile">Профиль</Link>
          <Link to="/import">Импорт</Link>
        </nav>
        <div className="app-toggles">
          <label>
            Ночной режим
            <input
              type="checkbox"
              checked={nightMode}
              onChange={(event) => setNightMode(event.target.checked)}
            />
          </label>
          <label>
            Крупный текст
            <input
              type="checkbox"
              checked={largeText}
              onChange={(event) => setLargeText(event.target.checked)}
            />
          </label>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AppShell;

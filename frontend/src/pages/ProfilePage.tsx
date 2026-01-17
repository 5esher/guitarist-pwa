import { useEffect, useState } from "react";
import { fetchProfile, saveProfile } from "../services/api/profilesApi";
import { getClientId } from "../services/favorites/favoritesService";

const ProfilePage = () => {
  const [displayName, setDisplayName] = useState("");
  const [instrument, setInstrument] = useState("guitar");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const profile = await fetchProfile();
      if (profile) {
        setDisplayName(profile.displayName);
        setInstrument(profile.instrument);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    await saveProfile(displayName, instrument);
    setStatus("Профиль сохранён.");
    setTimeout(() => setStatus(null), 2000);
  };

  return (
    <section className="page">
      <header className="page-header">
        <h1>Профиль</h1>
        <p className="meta">Профиль используется для синхронизации избранного и сет-листов.</p>
      </header>

      <div className="profile-form">
        <label>
          Имя
          <input
            className="search"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </label>
        <label>
          Инструмент
          <select value={instrument} onChange={(event) => setInstrument(event.target.value)}>
            <option value="guitar">Гитара</option>
            <option value="ukulele">Укулеле</option>
            <option value="bass">Бас</option>
          </select>
        </label>
        <button type="button" onClick={handleSave}>Сохранить</button>
        {status && <p className="meta">{status}</p>}
        <p className="meta">Ваш ID: {getClientId()}</p>
      </div>
    </section>
  );
};

export default ProfilePage;

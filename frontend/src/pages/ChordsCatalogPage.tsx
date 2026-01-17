import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchChords } from "../services/api/chordsApi";
import { Chord } from "../services/types";
import { chordSlug } from "../utils/chordSlug";
import {
  fetchFavorites,
  loadLocalFavorites,
  saveLocalFavorites,
  syncFavorites,
  toggleFavoriteChord
} from "../services/favorites/favoritesService";

const ChordsCatalogPage = () => {
  const [query, setQuery] = useState("");
  const [chords, setChords] = useState<Chord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState(loadLocalFavorites());

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const remote = await fetchFavorites();
        setFavorites(remote);
        saveLocalFavorites(remote);
      } catch (_error) {
        // fallback to local
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchChords();
        setChords(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Не удалось загрузить аккорды");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return chords;
    }
    return chords.filter((chord) => chord.name.toLowerCase().includes(normalized));
  }, [query, chords]);

  const handleToggleFavorite = async (chord: Chord) => {
    const next = toggleFavoriteChord(favorites, chord);
    setFavorites(next);
    saveLocalFavorites(next);
    try {
      await syncFavorites(next);
    } catch (_error) {
      // ignore sync errors
    }
  };

  return (
    <section className="page">
      <header className="page-header">
        <div className="header-row">
          <h1>Каталог аккордов</h1>
          <div className="header-actions">
            <Link to="/" className="secondary-link">
              Каталог песен
            </Link>
            <Link to="/chords/new" className="secondary-link">
              Новый аккорд
            </Link>
          </div>
        </div>
        <input
          className="search"
          type="search"
          placeholder="Поиск аккорда"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </header>

      {loading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="chord-grid">
          {filtered.map((chord) => {
            const isFavorite = favorites.chords.includes(chord.name);
            return (
              <figure key={chord.id} className="chord-card">
                <Link to={`/chords/${encodeURIComponent(chord.name)}`}>
                  <img src={`/chords/${chordSlug(chord.name)}.svg`} alt={`Аккорд ${chord.name}`} />
                  <figcaption>{chord.name}</figcaption>
                </Link>
                <button
                  type="button"
                  className={isFavorite ? "favorite-button active" : "favorite-button"}
                  onClick={() => handleToggleFavorite(chord)}
                >
                  {isFavorite ? "★" : "☆"}
                </button>
              </figure>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ChordsCatalogPage;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchChordByName } from "../services/api/chordsApi";
import { Chord } from "../services/types";
import { chordSlug } from "../utils/chordSlug";
import {
  fetchFavorites,
  loadLocalFavorites,
  saveLocalFavorites,
  syncFavorites,
  toggleFavoriteChord
} from "../services/favorites/favoritesService";

const ChordDetailsPage = () => {
  const { name } = useParams();
  const [chord, setChord] = useState<Chord | null>(null);
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
      if (!name) {
        setError("Аккорд не найден");
        setLoading(false);
        return;
      }
      try {
        const data = await fetchChordByName(name);
        setChord(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Не удалось загрузить аккорд");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [name]);

  const handleToggleFavorite = async () => {
    if (!chord) {
      return;
    }
    const next = toggleFavoriteChord(favorites, chord);
    setFavorites(next);
    saveLocalFavorites(next);
    try {
      await syncFavorites(next);
    } catch (_error) {
      // ignore sync errors
    }
  };

  const isFavorite = chord ? favorites.chords.includes(chord.name) : false;
  const variants = chord?.fingering.variants ?? [];

  return (
    <section className="page">
      <header className="page-header">
        <div className="header-row">
          <Link to="/chords" className="back-link">← К каталогу аккордов</Link>
          <button
            type="button"
            className={isFavorite ? "favorite-button active" : "favorite-button"}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? "★ В избранном" : "☆ В избранное"}
          </button>
        </div>
        <h1>{chord?.name ?? "Аккорд"}</h1>
      </header>

      {loading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>{error}</p>
      ) : chord ? (
        <div className="chord-detail">
          <div className="chord-detail-block">
            <img
              src={`/chords/${chordSlug(chord.name)}.svg`}
              alt={`Диаграмма ${chord.name}`}
              className="chord-detail-image"
            />
            <div className="chord-detail-info">
              <p><strong>Название:</strong> {chord.name}</p>
              <p><strong>Тип:</strong> {chord.fingering.type}</p>
            </div>
          </div>
          {variants.length > 0 && (
            <div>
              <h2>Вариации аппликатур</h2>
              <div className="chord-grid">
                {variants.map((variant, index) => (
                  <figure key={`${variant.src}-${index}`} className="chord-card">
                    <img src={variant.src} alt={`Вариация ${chord.name}`} />
                    <figcaption>{chord.name} · Вариант {index + 1}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Аккорд не найден.</p>
      )}
    </section>
  );
};

export default ChordDetailsPage;

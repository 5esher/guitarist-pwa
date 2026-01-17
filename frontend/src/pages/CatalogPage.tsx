import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSongs } from "../services/api/songsApi";
import { cacheSongs, getCachedSongs } from "../services/offline/songCache";
import { Song } from "../services/types";
import {
  fetchFavorites,
  loadLocalFavorites,
  saveLocalFavorites,
  syncFavorites,
  toggleFavoriteSong
} from "../services/favorites/favoritesService";

const CatalogPage = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(loadLocalFavorites());

  useEffect(() => {
    const load = async () => {
      try {
        const remoteSongs = await fetchSongs();
        setSongs(remoteSongs);
        await cacheSongs(remoteSongs);
      } catch (_error) {
        const cached = await getCachedSongs();
        setSongs(cached);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const remoteFavorites = await fetchFavorites();
        setFavorites(remoteFavorites);
        saveLocalFavorites(remoteFavorites);
      } catch (_error) {
        // fallback to local
      }
    };

    loadFavorites();
  }, []);

  const filteredSongs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return songs;
    }
    return songs.filter((song) =>
      `${song.title} ${song.author}`.toLowerCase().includes(normalized)
    );
  }, [query, songs]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleToggleFavorite = async (song: Song) => {
    const next = toggleFavoriteSong(favorites, song);
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
          <h1>Каталог песен</h1>
          <div className="header-actions">
            <Link to="/chords" className="secondary-link">
              Каталог аккордов
            </Link>
            <Link to="/import" className="secondary-link">
              Импорт песен
            </Link>
          </div>
        </div>
        <input
          className="search"
          type="search"
          placeholder="Поиск по названию или автору"
          value={query}
          onChange={handleChange}
        />
      </header>

      {loading ? (
        <p>Загрузка...</p>
      ) : filteredSongs.length === 0 ? (
        <p>Песни не найдены.</p>
      ) : (
        <ul className="song-list">
          {filteredSongs.map((song) => {
            const isFavorite = favorites.songs.includes(song.id);
            return (
              <li key={song.id} className="song-card">
                <Link to={`/songs/${song.id}`} className="song-link">
                  <strong>{song.title}</strong>
                  <span>{song.author}</span>
                  <small>Тональность: {song.originalKey}</small>
                </Link>
                <button
                  type="button"
                  className={isFavorite ? "favorite-button active" : "favorite-button"}
                  onClick={() => handleToggleFavorite(song)}
                >
                  {isFavorite ? "★ В избранном" : "☆ В избранное"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default CatalogPage;

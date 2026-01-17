import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchSetlistById, updateSetlist } from "../services/api/setlistsApi";
import { fetchSongs } from "../services/api/songsApi";
import { Setlist, Song } from "../services/types";

type EditableItem = {
  id: string;
  songId: string;
  position: number;
  durationSeconds: number;
  title: string;
  author: string;
};

const SetlistDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [setlist, setSetlist] = useState<Setlist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<EditableItem[]>([]);
  const [selectedSong, setSelectedSong] = useState("");
  const [durationSeconds, setDurationSeconds] = useState(180);

  useEffect(() => {
    const load = async () => {
      if (!id) {
        return;
      }
      const [setlistData, songsData] = await Promise.all([fetchSetlistById(id), fetchSongs()]);
      setSetlist(setlistData);
      setTitle(setlistData.title);
      setItems([...setlistData.items].sort((a, b) => a.position - b.position));
      setSongs(songsData);
    };
    load();
  }, [id]);

  const availableSongs = useMemo(() => {
    return songs.filter((song) => !items.some((item) => item.songId === song.id));
  }, [songs, items]);

  const handleAdd = () => {
    const song = songs.find((entry) => entry.id === selectedSong);
    if (!song) {
      return;
    }
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        songId: song.id,
        position: prev.length,
        durationSeconds,
        title: song.title,
        author: song.author
      }
    ]);
    setSelectedSong("");
  };

  const handleMove = (index: number, direction: number) => {
    setItems((prev) => {
      const next = [...prev];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= next.length) {
        return prev;
      }
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next.map((item, idx) => ({ ...item, position: idx }));
    });
  };

  const handleSave = async () => {
    if (!id) {
      return;
    }
    const payload = items.map((item, index) => ({
      songId: item.songId,
      position: index,
      durationSeconds: item.durationSeconds
    }));
    const updated = await updateSetlist(id, title, payload);
    setSetlist(updated);
    setItems([...updated.items].sort((a, b) => a.position - b.position));
  };

  if (!setlist) {
    return (
      <section className="page">
        <p>Загрузка...</p>
      </section>
    );
  }

  return (
    <section className="page">
      <header className="page-header">
        <Link to="/setlists" className="back-link">← К сет-листам</Link>
        <h1>{setlist.title}</h1>
        <p className="meta">Добавьте песни и задайте длительность для автоперехода.</p>
      </header>

      <div className="setlist-edit">
        <label>
          Название
          <input
            className="search"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <div className="setlist-add">
          <select value={selectedSong} onChange={(event) => setSelectedSong(event.target.value)}>
            <option value="">Выберите песню</option>
            {availableSongs.map((song) => (
              <option key={song.id} value={song.id}>
                {song.title} — {song.author}
              </option>
            ))}
          </select>
          <label>
            Длительность (сек)
            <input
              type="number"
              min={30}
              value={durationSeconds}
              onChange={(event) => setDurationSeconds(Number(event.target.value))}
            />
          </label>
          <button type="button" onClick={handleAdd}>Добавить</button>
        </div>
      </div>

      <ul className="song-list">
        {items.map((item, index) => (
          <li key={item.id} className="song-card">
            <div className="song-link">
              <strong>{item.title}</strong>
              <span className="meta">{item.author} · {item.durationSeconds}с</span>
            </div>
            <div className="buttons">
              <button type="button" onClick={() => handleMove(index, -1)} disabled={index === 0}>↑</button>
              <button type="button" onClick={() => handleMove(index, 1)} disabled={index === items.length - 1}>↓</button>
              <button
                type="button"
                onClick={() => navigate(`/songs/${item.songId}?setlistId=${setlist.id}&index=${index}&auto=1`)}
              >
                Старт отсюда
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="setlist-actions">
        <button type="button" onClick={handleSave}>Сохранить</button>
        {items[0] && (
          <button
            type="button"
            onClick={() => navigate(`/songs/${items[0].songId}?setlistId=${setlist.id}&index=0&auto=1`)}
          >
            Запустить сет-лист
          </button>
        )}
      </div>
    </section>
  );
};

export default SetlistDetailsPage;

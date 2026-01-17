import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createSetlist, fetchSetlists } from "../services/api/setlistsApi";
import { Setlist } from "../services/types";

const SetlistsPage = () => {
  const [setlists, setSetlists] = useState<Setlist[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const data = await fetchSetlists();
      setSetlists(data);
    } catch (_error) {
      setSetlists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) {
      return;
    }
    await createSetlist(title.trim(), []);
    setTitle("");
    load();
  };

  return (
    <section className="page">
      <header className="page-header">
        <h1>Сет-листы</h1>
        <p className="meta">Соберите порядок песен для выступления и включите автопереход.</p>
      </header>

      <div className="setlist-create">
        <input
          className="search"
          placeholder="Название сет-листа"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button type="button" onClick={handleCreate}>Создать</button>
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : setlists.length === 0 ? (
        <p>Пока нет сет-листов.</p>
      ) : (
        <ul className="song-list">
          {setlists.map((setlist) => (
            <li key={setlist.id} className="song-card">
              <div className="song-link">
                <strong>{setlist.title}</strong>
                <span className="meta">Песен: {setlist.items.length}</span>
              </div>
              <div className="buttons">
                <button type="button" onClick={() => navigate(`/setlists/${setlist.id}`)}>
                  Редактировать
                </button>
                {setlist.items[0] && (
                  <Link
                    to={`/songs/${setlist.items[0].songId}?setlistId=${setlist.id}&index=0&auto=1`}
                    className="secondary-link"
                  >
                    Старт
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SetlistsPage;

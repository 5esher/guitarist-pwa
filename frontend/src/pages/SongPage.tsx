import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSongById } from "../services/api/songsApi";
import { cacheSong, getCachedSongById } from "../services/offline/songCache";
import { Song } from "../services/types";
import { transposeTextWithChords } from "../services/transposition/transposeTextWithChords";
import { extractChordsFromText } from "../services/parsing/extractChordsFromText";
import { parseSongText } from "../services/parsing/parseSongText";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { chordSlug } from "../utils/chordSlug";
import {
  fetchFavorites,
  loadLocalFavorites,
  saveLocalFavorites,
  syncFavorites,
  toggleFavoriteSong
} from "../services/favorites/favoritesService";
import { useMetronome } from "../services/metronome/useMetronome";
import { useAutoScroll } from "../services/autoscroll/useAutoScroll";
import { buildBeginnerPlan } from "../services/beginner/beginnerMode";

const SongPage = () => {
  const { id } = useParams();
  const [song, setSong] = useState<Song | null>(null);
  const [semitones, setSemitones] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedChord, setSelectedChord] = useState<string | null>(null);
  const [transposeHistory, setTransposeHistory] = useState<number[]>([0]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [beginnerMode, setBeginnerMode] = useState(false);
  const online = useOnlineStatus();
  const [favorites, setFavorites] = useState(loadLocalFavorites());
  const metronome = useMetronome(song?.bpm ?? 120);
  const autoScroll = useAutoScroll();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const remote = await fetchFavorites();
        setFavorites(remote);
        saveLocalFavorites(remote);
      } catch (_error) {
        // fallback
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const remoteSong = await fetchSongById(id);
        setSong(remoteSong);
        await cacheSong(remoteSong);
        if (remoteSong.bpm) {
          metronome.setBpm(remoteSong.bpm);
        }
      } catch (_error) {
        const cached = await getCachedSongById(id);
        setSong(cached ?? null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const beginnerPlan = useMemo(() => {
    if (!song) {
      return null;
    }
    return buildBeginnerPlan(song.textWithChords);
  }, [song]);

  const transposedText = useMemo(() => {
    if (!song) {
      return "";
    }
    if (beginnerMode && beginnerPlan) {
      return beginnerPlan.simplifiedText;
    }
    return transposeTextWithChords(song.textWithChords, semitones);
  }, [song, semitones, beginnerMode, beginnerPlan]);

  const chords = useMemo(() => {
    if (!song) {
      return [];
    }
    return extractChordsFromText(transposedText);
  }, [song, transposedText]);

  const parsedLines = useMemo(() => parseSongText(transposedText).lines, [transposedText]);

  const handleTranspose = (value: number) => {
    const next = semitones + value;
    setSemitones(next);
    const newHistory = transposeHistory.slice(0, historyIndex + 1);
    newHistory.push(next);
    setTransposeHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleReset = () => {
    setSemitones(0);
    setTransposeHistory([0]);
    setHistoryIndex(0);
  };

  const undoTranspose = () => {
    if (historyIndex === 0) {
      return;
    }
    const nextIndex = historyIndex - 1;
    setHistoryIndex(nextIndex);
    setSemitones(transposeHistory[nextIndex]);
  };

  const redoTranspose = () => {
    if (historyIndex >= transposeHistory.length - 1) {
      return;
    }
    const nextIndex = historyIndex + 1;
    setHistoryIndex(nextIndex);
    setSemitones(transposeHistory[nextIndex]);
  };

  const handleToggleFavorite = async () => {
    if (!song) {
      return;
    }
    const next = toggleFavoriteSong(favorites, song);
    setFavorites(next);
    saveLocalFavorites(next);
    try {
      await syncFavorites(next);
    } catch (_error) {
      // ignore sync errors
    }
  };

  const isFavorite = song ? favorites.songs.includes(song.id) : false;

  return (
    <section className="page">
      <header className="page-header">
        <div className="header-row">
          <Link to="/" className="back-link">← К каталогу</Link>
          <div className="header-actions">
            <span className={online ? "status online" : "status offline"}>
              {online ? "Онлайн" : "Оффлайн"}
            </span>
            <button
              type="button"
              className={isFavorite ? "favorite-button active" : "favorite-button"}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? "★ В избранном" : "☆ В избранное"}
            </button>
          </div>
        </div>
        {song && (
          <div>
            <h1>{song.title}</h1>
            <p className="meta">
              {song.author} · Тональность: {song.originalKey}
              {song.bpm ? ` · ${song.bpm} BPM` : ""}
            </p>
          </div>
        )}
      </header>

      {loading ? (
        <p>Загрузка...</p>
      ) : !song ? (
        <p>Песня не найдена.</p>
      ) : (
        <div className="song-content">
          <div className="transpose-controls">
            <span>
              Транспозиция: {beginnerMode && beginnerPlan ? beginnerPlan.transpose : semitones} полутонов
            </span>
            <div className="buttons">
              <button type="button" onClick={() => handleTranspose(-1)} disabled={beginnerMode}>
                -
              </button>
              <button type="button" onClick={handleReset} disabled={beginnerMode}>
                Сброс
              </button>
              <button type="button" onClick={() => handleTranspose(1)} disabled={beginnerMode}>
                +
              </button>
              <button type="button" onClick={undoTranspose} disabled={historyIndex === 0 || beginnerMode}>
                Undo
              </button>
              <button
                type="button"
                onClick={redoTranspose}
                disabled={historyIndex >= transposeHistory.length - 1 || beginnerMode}
              >
                Redo
              </button>
            </div>
          </div>

          <div className="utility-panel">
            <div className="utility-block">
              <label className="beginner-toggle">
                Режим новичка
                <input
                  type="checkbox"
                  checked={beginnerMode}
                  onChange={(event) => setBeginnerMode(event.target.checked)}
                />
              </label>
              {beginnerMode && beginnerPlan ? (
                <div className="beginner-hints">
                  <p>
                    Подобран упрощённый набор аккордов для этой песни.
                  </p>
                  {beginnerPlan.transpose !== 0 && (
                    <p>
                      Чтобы сохранить оригинальную тональность, установите каподастр
                      на лад {Math.abs(beginnerPlan.transpose)}.
                    </p>
                  )}
                  {beginnerPlan.changes.length > 0 ? (
                    <div className="beginner-changes">
                      <h4>Изменения</h4>
                      <ul>
                        {beginnerPlan.changes.map((change) => (
                          <li key={`${change.from}-${change.to}`}>
                            <strong>{change.from}</strong> → <strong>{change.to}</strong> ×{change.count}
                            <span> ({change.reason})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>Все аккорды уже подходят для новичка.</p>
                  )}
                </div>
              ) : (
                <p>Включите, чтобы автоматически упростить аккорды.</p>
              )}
            </div>
            <div className="utility-block">
              <label>
                Автоскролл
                <input
                  type="checkbox"
                  checked={autoScroll.enabled}
                  onChange={(event) => autoScroll.setEnabled(event.target.checked)}
                />
              </label>
              <label>
                Скорость: {autoScroll.speed}
                <input
                  type="range"
                  min={10}
                  max={120}
                  value={autoScroll.speed}
                  onChange={(event) => autoScroll.setSpeed(Number(event.target.value))}
                />
              </label>
            </div>
            <div className="utility-block">
              <label>
                Метроном {metronome.bpm} BPM
                <input
                  type="range"
                  min={40}
                  max={220}
                  value={metronome.bpm}
                  onChange={(event) => metronome.setBpm(Number(event.target.value))}
                />
              </label>
              <button type="button" onClick={metronome.toggle}>
                {metronome.running ? "Стоп" : "Старт"}
              </button>
            </div>
          </div>

          {selectedChord && (
            <div className="chord-preview">
              <h3>{selectedChord}</h3>
              <img src={`/chords/${chordSlug(selectedChord)}.svg`} alt={selectedChord} />
              <button type="button" onClick={() => setSelectedChord(null)}>Закрыть</button>
            </div>
          )}

          <div className="song-text">
            {parsedLines.map((line, lineIndex) => (
              <div key={`line-${lineIndex}`} className="song-line">
                {line.segments.map((segment, segmentIndex) => {
                  if (segment.type === "chord") {
                    return (
                      <button
                        key={`seg-${lineIndex}-${segmentIndex}`}
                        type="button"
                        className="chord-chip"
                        onClick={() => setSelectedChord(segment.value)}
                      >
                        {segment.value}
                      </button>
                    );
                  }
                  return (
                    <span key={`seg-${lineIndex}-${segmentIndex}`}>{segment.value}</span>
                  );
                })}
              </div>
            ))}
          </div>

          {chords.length > 0 && (
            <div className="chord-gallery">
              <h2>Аккорды</h2>
              <div className="chord-grid">
                {chords.map((chord) => (
                  <figure key={chord} className="chord-card">
                    <img
                      src={`/chords/${chordSlug(chord)}.svg`}
                      alt={`Аккорд ${chord}`}
                      loading="lazy"
                    />
                    <figcaption>{chord}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default SongPage;

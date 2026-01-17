import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchSongById } from "../services/api/songsApi";
import { cacheSong, getCachedSongById } from "../services/offline/songCache";
import { Setlist, Song, SongComment } from "../services/types";
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
import { buildBeginnerPlan, suggestCapoForText } from "../services/beginner/beginnerMode";
import { fetchSetlistById } from "../services/api/setlistsApi";
import { addCommentVersion, createComment, fetchComments, voteComment } from "../services/api/commentsApi";

const SongPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [song, setSong] = useState<Song | null>(null);
  const [semitones, setSemitones] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedChord, setSelectedChord] = useState<string | null>(null);
  const [transposeHistory, setTransposeHistory] = useState<number[]>([0]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [beginnerMode, setBeginnerMode] = useState(false);
  const [showTabs, setShowTabs] = useState(true);
  const [distractionFree, setDistractionFree] = useState(false);
  const [setlist, setSetlist] = useState<Setlist | null>(null);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [comments, setComments] = useState<SongComment[]>([]);
  const [commentDraft, setCommentDraft] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const online = useOnlineStatus();
  const [favorites, setFavorites] = useState(loadLocalFavorites());
  const metronome = useMetronome(song?.bpm ?? 120);
  const autoScroll = useAutoScroll();
  const searchParams = new URLSearchParams(location.search);
  const setlistId = searchParams.get("setlistId");
  const setlistIndex = Number(searchParams.get("index") ?? "0");
  const safeSetlistIndex = Number.isNaN(setlistIndex) ? 0 : setlistIndex;
  const autoParam = searchParams.get("auto") === "1";

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

  useEffect(() => {
    setAutoAdvanceEnabled(autoParam);
  }, [autoParam]);

  useEffect(() => {
    if (!setlistId) {
      setSetlist(null);
      return;
    }
    const loadSetlist = async () => {
      try {
        const data = await fetchSetlistById(setlistId);
        setSetlist(data);
      } catch (_error) {
        setSetlist(null);
      }
    };
    loadSetlist();
  }, [setlistId]);

  useEffect(() => {
    if (!song) {
      return;
    }
    setShowTabs(Boolean(song.textTabs));
  }, [song]);

  useEffect(() => {
    document.body.classList.toggle("distraction-free", distractionFree);
    return () => {
      document.body.classList.remove("distraction-free");
    };
  }, [distractionFree]);

  useEffect(() => {
    const root = document.documentElement;
    if (distractionFree && root.requestFullscreen) {
      root.requestFullscreen().catch(() => undefined);
    }
    if (!distractionFree && document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => undefined);
    }
  }, [distractionFree]);

  useEffect(() => {
    const loadComments = async () => {
      if (!song) {
        return;
      }
      try {
        const data = await fetchComments(song.id);
        setComments(data);
      } catch (_error) {
        setComments([]);
      }
    };
    loadComments();
  }, [song]);

  const beginnerPlan = useMemo(() => {
    if (!song) {
      return null;
    }
    return buildBeginnerPlan(song.textWithChords);
  }, [song]);

  const smartCapo = useMemo(() => {
    if (!song) {
      return null;
    }
    return suggestCapoForText(song.textWithChords);
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

  const orderedSetlistItems = useMemo(() => {
    if (!setlist) {
      return [];
    }
    return [...setlist.items].sort((a, b) => a.position - b.position);
  }, [setlist]);

  const currentSetlistItem = orderedSetlistItems[safeSetlistIndex];

  useEffect(() => {
    if (!currentSetlistItem || !autoAdvanceEnabled || !setlistId) {
      setRemainingSeconds(null);
      return;
    }
    setRemainingSeconds(currentSetlistItem.durationSeconds);
    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => (prev === null ? null : Math.max(prev - 1, 0)));
    }, 1000);
    const timeout = window.setTimeout(() => {
      const nextIndex = safeSetlistIndex + 1;
      if (orderedSetlistItems[nextIndex]) {
        navigate(`/songs/${orderedSetlistItems[nextIndex].songId}?setlistId=${setlistId}&index=${nextIndex}&auto=1`);
      }
    }, currentSetlistItem.durationSeconds * 1000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [autoAdvanceEnabled, currentSetlistItem, navigate, orderedSetlistItems, setlistId, safeSetlistIndex]);

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

  const patternTokens = useMemo(() => {
    const pattern = song?.strumPattern?.trim();
    const tokens = pattern ? pattern.split(/\s+/).filter(Boolean) : ["↓", "↑"];
    return tokens.length > 0 ? tokens : ["↓", "↑"];
  }, [song]);

  const renderStrumLine = (lineIndex: number, chordsOnLine: string[]) => {
    if (chordsOnLine.length === 0) {
      return null;
    }
    return (
      <div className="strum-line" key={`strum-${lineIndex}`}>
        {chordsOnLine.map((_, index) => (
          <span key={`strum-${lineIndex}-${index}`} className="strum-arrow">
            {patternTokens[index % patternTokens.length]}
          </span>
        ))}
      </div>
    );
  };

  const handleCreateComment = async () => {
    if (!song || !commentDraft.trim()) {
      return;
    }
    await createComment(song.id, commentDraft.trim());
    setCommentDraft("");
    const data = await fetchComments(song.id);
    setComments(data);
  };

  const handleSaveCommentVersion = async (commentId: string) => {
    if (!editDraft.trim()) {
      return;
    }
    await addCommentVersion(commentId, editDraft.trim());
    setEditingCommentId(null);
    setEditDraft("");
    if (song) {
      const data = await fetchComments(song.id);
      setComments(data);
    }
  };

  const handleVote = async (commentId: string, vote: number) => {
    await voteComment(commentId, vote);
    if (song) {
      const data = await fetchComments(song.id);
      setComments(data);
    }
  };

  const goToSetlistIndex = (index: number) => {
    if (!setlistId) {
      return;
    }
    const target = orderedSetlistItems[index];
    if (!target) {
      return;
    }
    navigate(`/songs/${target.songId}?setlistId=${setlistId}&index=${index}&auto=${autoAdvanceEnabled ? 1 : 0}`);
  };

  const handleNextSetlist = () => {
    goToSetlistIndex(safeSetlistIndex + 1);
  };

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
            {setlist && currentSetlistItem && (
              <p className="meta">
                Сет-лист: {setlist.title} · Песня {safeSetlistIndex + 1} из {orderedSetlistItems.length}
                {remainingSeconds !== null ? ` · До автоперехода: ${remainingSeconds}с` : ""}
              </p>
            )}
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
              {!beginnerMode && smartCapo?.capoFret ? (
                <p>Совет по капо: лад {smartCapo.capoFret} для более удобных аккордов.</p>
              ) : null}
            </div>
            <div className="utility-block">
              <label>
                Двухколоночный режим (текст + табы)
                <input
                  type="checkbox"
                  checked={showTabs}
                  onChange={(event) => setShowTabs(event.target.checked)}
                  disabled={!song?.textTabs}
                />
              </label>
              {song?.textTabs ? (
                <p>Табы будут показаны справа от текста.</p>
              ) : (
                <p>Для этой песни табы не загружены.</p>
              )}
              <label>
                Режим без отвлечений
                <input
                  type="checkbox"
                  checked={distractionFree}
                  onChange={(event) => setDistractionFree(event.target.checked)}
                />
              </label>
              {setlist && (
                <label>
                  Автопереход по сет-листу
                  <input
                    type="checkbox"
                    checked={autoAdvanceEnabled}
                    onChange={(event) => setAutoAdvanceEnabled(event.target.checked)}
                  />
                </label>
              )}
              {setlist && currentSetlistItem && (
                <button type="button" onClick={handleNextSetlist} disabled={!orderedSetlistItems[safeSetlistIndex + 1]}>
                  Следующая песня
                </button>
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

          <div className={showTabs && song?.textTabs ? "song-columns two-column" : "song-columns"}>
            <div className="song-text">
              {parsedLines.map((line, lineIndex) => {
                const chordsOnLine = line.segments
                  .filter((segment) => segment.type === "chord")
                  .map((segment) => segment.value);
                return (
                  <div key={`line-${lineIndex}`} className="song-line-group">
                    {renderStrumLine(lineIndex, chordsOnLine)}
                    <div className="song-line">
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
                  </div>
                );
              })}
            </div>
            {showTabs && song?.textTabs && (
              <pre className="song-tabs">{song.textTabs}</pre>
            )}
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

          <div className="comments-panel">
            <h2>Сообщество и комментарии</h2>
            <div className="comment-form">
              <textarea
                className="comment-textarea"
                placeholder="Поделитесь версией или советом..."
                value={commentDraft}
                onChange={(event) => setCommentDraft(event.target.value)}
              />
              <button type="button" onClick={handleCreateComment}>
                Опубликовать
              </button>
            </div>
            {comments.length === 0 ? (
              <p>Пока нет комментариев. Будьте первым!</p>
            ) : (
              <ul className="comment-list">
                {comments.map((comment) => (
                  <li key={comment.id} className="comment-card">
                    <div className="comment-meta">
                      <span>Пользователь: {comment.clientId.slice(0, 8)}</span>
                      <span>Голоса: {comment.votes}</span>
                    </div>
                    <p>{comment.body}</p>
                    <div className="comment-actions">
                      <button type="button" onClick={() => handleVote(comment.id, 1)}>👍</button>
                      <button type="button" onClick={() => handleVote(comment.id, -1)}>👎</button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCommentId(comment.id);
                          setEditDraft(comment.body);
                        }}
                      >
                        Новая версия
                      </button>
                    </div>
                    {editingCommentId === comment.id && (
                      <div className="comment-edit">
                        <textarea
                          className="comment-textarea"
                          value={editDraft}
                          onChange={(event) => setEditDraft(event.target.value)}
                        />
                        <button type="button" onClick={() => handleSaveCommentVersion(comment.id)}>
                          Сохранить
                        </button>
                      </div>
                    )}
                    <details>
                      <summary>История версий ({comment.versions.length})</summary>
                      <ul>
                        {comment.versions.map((version) => (
                          <li key={version.id}>{version.body}</li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SongPage;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createChord, fetchChordByName, updateChord } from "../services/api/chordsApi";
import { Chord } from "../services/types";

const emptyFingering = { type: "svg", src: "" } as const;

const ChordEditorPage = () => {
  const { name } = useParams();
  const [chordName, setChordName] = useState(name ?? "");
  const [fingeringSrc, setFingeringSrc] = useState("");
  const [variantSrc, setVariantSrc] = useState("");
  const [existing, setExisting] = useState<Chord | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!name) {
        return;
      }
      try {
        const data = await fetchChordByName(name);
        setExisting(data);
        setChordName(data.name);
        setFingeringSrc(data.fingering.src);
      } catch (_error) {
        // ignore
      }
    };

    load();
  }, [name]);

  const handleSave = async () => {
    setStatus(null);
    const baseFingering = {
      type: "svg",
      src: fingeringSrc || emptyFingering.src,
      variants: existing?.fingering.variants ?? []
    };

    try {
      if (existing) {
        const updated = await updateChord(chordName, baseFingering);
        setExisting(updated);
        setStatus("Аккорд обновлён");
      } else {
        const created = await createChord({ name: chordName, fingering: baseFingering });
        setExisting(created);
        setStatus("Аккорд создан");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Ошибка сохранения");
    }
  };

  const handleAddVariant = async () => {
    if (!existing || !variantSrc) {
      return;
    }
    const nextVariants = [...(existing.fingering.variants ?? []), { type: "svg", src: variantSrc }];
    const updated = await updateChord(existing.name, {
      ...existing.fingering,
      variants: nextVariants
    });
    setExisting(updated);
    setVariantSrc("");
  };

  return (
    <section className="page">
      <header className="page-header">
        <div className="header-row">
          <Link to="/chords" className="back-link">← К каталогу аккордов</Link>
        </div>
        <h1>Редактор аккордов</h1>
      </header>

      <div className="editor-form">
        <label>
          Название аккорда
          <input value={chordName} onChange={(event) => setChordName(event.target.value)} />
        </label>
        <label>
          URL диаграммы (SVG)
          <input value={fingeringSrc} onChange={(event) => setFingeringSrc(event.target.value)} />
        </label>
        <button type="button" onClick={handleSave}>Сохранить</button>
        {status && <p>{status}</p>}
      </div>

      {existing && (
        <div className="editor-variants">
          <h2>Добавить вариацию</h2>
          <input
            value={variantSrc}
            onChange={(event) => setVariantSrc(event.target.value)}
            placeholder="URL диаграммы варианта"
          />
          <button type="button" onClick={handleAddVariant}>Добавить вариант</button>
          <div className="chord-grid">
            {(existing.fingering.variants ?? []).map((variant, index) => (
              <figure key={`${variant.src}-${index}`} className="chord-card">
                <img src={variant.src} alt={`Вариант ${existing.name}`} />
                <figcaption>{existing.name} · Вариант {index + 1}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ChordEditorPage;

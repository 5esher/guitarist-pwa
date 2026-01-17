import { useState } from "react";
import { createSong } from "../services/api/songsApi";
import { parseChordPro } from "../services/importers/chordPro";
import { parseUltimateGuitar } from "../services/importers/ultimateGuitar";

const ImportPage = () => {
  const [format, setFormat] = useState<"chordpro" | "ultimate">("chordpro");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleImport = async () => {
    setStatus(null);
    try {
      const payload = format === "chordpro" ? parseChordPro(content) : parseUltimateGuitar(content);
      await createSong(payload);
      setStatus("Импорт выполнен успешно");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Ошибка импорта");
    }
  };

  return (
    <section className="page">
      <header className="page-header">
        <h1>Импорт песен</h1>
      </header>
      <div className="import-controls">
        <label>
          Формат:
          <select value={format} onChange={(event) => setFormat(event.target.value as "chordpro" | "ultimate")}>
            <option value="chordpro">ChordPro</option>
            <option value="ultimate">Ultimate Guitar TXT</option>
          </select>
        </label>
        <textarea
          className="import-textarea"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Вставьте текст песни"
        />
        <button type="button" onClick={handleImport}>Импортировать</button>
        {status && <p>{status}</p>}
      </div>
    </section>
  );
};

export default ImportPage;

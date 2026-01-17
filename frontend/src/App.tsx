import { BrowserRouter, Route, Routes } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import SongPage from "./pages/SongPage";
import ChordsCatalogPage from "./pages/ChordsCatalogPage";
import ChordDetailsPage from "./pages/ChordDetailsPage";
import ChordEditorPage from "./pages/ChordEditorPage";
import ImportPage from "./pages/ImportPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/songs/:id" element={<SongPage />} />
        <Route path="/chords" element={<ChordsCatalogPage />} />
        <Route path="/chords/new" element={<ChordEditorPage />} />
        <Route path="/chords/:name" element={<ChordDetailsPage />} />
        <Route path="/chords/:name/edit" element={<ChordEditorPage />} />
        <Route path="/import" element={<ImportPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

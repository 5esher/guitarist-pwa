import { BrowserRouter, Route, Routes } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import SongPage from "./pages/SongPage";
import ChordsCatalogPage from "./pages/ChordsCatalogPage";
import ChordDetailsPage from "./pages/ChordDetailsPage";
import ChordEditorPage from "./pages/ChordEditorPage";
import ImportPage from "./pages/ImportPage";
import AppShell from "./components/AppShell";
import SetlistsPage from "./pages/SetlistsPage";
import SetlistDetailsPage from "./pages/SetlistDetailsPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/songs/:id" element={<SongPage />} />
          <Route path="/chords" element={<ChordsCatalogPage />} />
          <Route path="/chords/new" element={<ChordEditorPage />} />
          <Route path="/chords/:name" element={<ChordDetailsPage />} />
          <Route path="/chords/:name/edit" element={<ChordEditorPage />} />
          <Route path="/import" element={<ImportPage />} />
          <Route path="/setlists" element={<SetlistsPage />} />
          <Route path="/setlists/:id" element={<SetlistDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
};

export default App;

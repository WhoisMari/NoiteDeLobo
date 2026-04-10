import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/ui/bottomNav/BottomNav";
import Narrator from "./pages/narrator/Narrator";
import Characters from "./pages/characters/Characters";
import Scoreboard from "./pages/scoreboard/Scoreboard";
import Settings from "./pages/settings/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Narrator />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Bot from "./components/pages/Bot";
import Insights from "./components/pages/Insights";
import ActiveLog from "./components/pages/ActiveLog";
import Settings from "./components/pages/Settings";

function App() {
  return (
    <div id="extension">
      <div className="extension-wrapper">
        <header>
          <h2>neuflo</h2>
          <p>connect</p>
        </header>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bot" element={<Bot />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/activeLog" element={<ActiveLog />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
}

export default App;

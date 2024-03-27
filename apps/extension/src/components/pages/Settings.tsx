import { Plug, Info, TrendUp } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

function Settings() {
  return (
    <main>
      <div className="tiles-container">
        <NavLink to="/" className="tile text">
          <Plug size={22} className="tile-icon" />
          <span>View integration</span>
        </NavLink>
        <NavLink to="/" className="tile text">
          <span>View sequence</span>
          <TrendUp size={22} className="tile-icon" />
        </NavLink>
        <NavLink to="/" className="tile text">
          <span>Help center</span>
          <Info size={22} className="tile-icon" />
        </NavLink>
      </div>
    </main>
  );
}

export default Settings;

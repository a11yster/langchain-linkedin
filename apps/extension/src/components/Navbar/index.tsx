import "./Navbar.css";
import { NavLink } from "react-router-dom";
import {
  Robot,
  Gauge,
  ProjectorScreenChart,
  FileText,
  Gear,
} from "@phosphor-icons/react";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="navContainer">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "navLink-pending" : isActive ? "active" : "navLink"
              }
            >
              <Gauge size={21} weight="light" />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bot"
              className={({ isActive, isPending }) =>
                isPending ? "navLink-pending" : isActive ? "active" : "navLink"
              }
            >
              <Robot size={21} weight="light" />
              <p>Bot</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/insights"
              className={({ isActive, isPending }) =>
                isPending ? "navLink-pending" : isActive ? "active" : "navLink"
              }
            >
              <ProjectorScreenChart size={21} weight="light" />
              <p>Insight</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/activeLog"
              className={({ isActive, isPending }) =>
                isPending ? "navLink-pending" : isActive ? "active" : "navLink"
              }
            >
              <FileText size={21} weight="light" />
              <p>Log</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive, isPending }) =>
                isPending ? "navLink-pending" : isActive ? "active" : "navLink"
              }
            >
              <Gear size={21} weight="light" />
              <p>Settings</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

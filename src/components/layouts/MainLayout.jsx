import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Empresa from "../empresa/Empresa";
import Usuarios from "../usuarios/Usuarios";

const menuItems = [
  { key: "empresa", label: "Configuracion de Empresa", icon: "domain" },
  { key: "usuarios", label: "Usuarios", icon: "manage_accounts" },
];

export default function MainLayout() {
  const [selected, setSelected] = useState("empresa");
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials =
    user?.first_name?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  let ContentComponent;
  switch (selected) {
    case "empresa":
      ContentComponent = <Empresa />;
      break;
    case "usuarios":
      ContentComponent = <Usuarios />;
      break;
    default:
      ContentComponent = (
        <p className="p-8 text-on-surface-variant">Seleccione una opcion</p>
      );
  }

  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      {/* ── Sidebar ── */}
      <aside
        className="h-screen w-64 fixed left-0 top-0 flex flex-col py-6 z-40 bg-[#f4faff]"
        style={{ borderRight: "1px solid var(--color-surface-container-high)" }}
      >
        {/* Brand */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
              <span
                className="material-symbols-outlined"
                style={{ color: "#fff", fontSize: 20, fontVariationSettings: "'FILL' 1" }}
              >
                domain
              </span>
            </div>
            <div>
              <h2
                className="text-[0.9rem] font-bold leading-tight"
                style={{ fontFamily: "Manrope", color: "#103745" }}
              >
                Business Suite
              </h2>
              <p className="text-xs opacity-70" style={{ color: "#416474" }}>
                Configuration Module
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-0">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSelected(item.key)}
              className={`w-full flex items-center gap-3 px-6 py-3 rounded-r-full text-sm font-medium transition-transform duration-200 hover:translate-x-1 ${
                selected === item.key
                  ? "bg-[#ceedfd] text-[#0060b0] font-bold"
                  : "text-[#416474] hover:bg-[#e7f6ff]"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="px-6 pt-4"
          style={{ borderTop: "1px solid var(--color-surface-container)" }}
        >
          <button className="w-full flex items-center gap-3 py-2 text-[#416474] hover:text-[#0060b0] transition-colors text-sm font-medium">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
              help
            </span>
            <span>Soporte</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-2 text-[#416474] hover:text-[#a83836] transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
              logout
            </span>
            <span>Cerrar sesion</span>
          </button>
        </div>
      </aside>

      {/* ── Content wrapper ── */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Top App Bar */}
        <header
          className="fixed top-0 left-64 right-0 z-30 h-16 flex justify-between items-center px-8"
          style={{
            background: "rgba(244,250,255,0.7)",
            backdropFilter: "blur(16px)",
            boxShadow: "0px 20px 40px rgba(16,55,69,0.06)",
          }}
        >
          <span
            className="text-xl font-extrabold"
            style={{
              fontFamily: "Manrope",
              background: "linear-gradient(to right, #0060b0, #4e9af9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The Ethereal Ledger
          </span>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-[#416474] hover:bg-[#ceedfd] transition-all duration-300 active:scale-95">
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                notifications
              </span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-[#416474] hover:bg-[#ceedfd] transition-all duration-300 active:scale-95">
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                settings
              </span>
            </button>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm select-none"
              style={{
                background: "var(--color-primary-container)",
                color: "var(--color-on-primary-container)",
              }}
            >
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="mt-16 min-h-[calc(100vh-4rem)]">{ContentComponent}</main>
      </div>
    </div>
  );
}

import React, { useEffect, useState, useCallback } from "react";
import { getTenantsPaginated, deleteTenant, updateTenant } from "@/services/tenants";

const LIMIT = 100;

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const AVATAR_COLORS = [
  { bg: "#c9e6ff", color: "#41637b" },
  { bg: "#cfedd0", color: "#4b654e" },
  { bg: "#b6d9f6", color: "#34576f" },
  { bg: "#ceedfd", color: "#0060b0" },
  { bg: "#ddfcde", color: "#48624b" },
];

function avatarStyle(index) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export default function Empresa() {
  const [tenants, setTenants]   = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchTenants = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getTenantsPaginated(page, LIMIT);
      setTenants(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message ?? "Error al cargar empresas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTenants(1);
  }, [fetchTenants]);

  const handleToggleStatus = async (tenant) => {
    try {
      if (tenant.status) {
        // desactivar (eliminacion logica)
        await deleteTenant(tenant._id);
      } else {
        // reactivar
        await updateTenant(tenant._id, { status: true });
      }
      fetchTenants(pagination.page);
    } catch (err) {
      alert(err.response?.data?.message ?? "Error al actualizar estatus.");
    }
  };

  return (
    <div className="pt-10 px-12 pb-16">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1
            className="text-4xl font-extrabold tracking-tight mb-2"
            style={{ fontFamily: "Manrope", color: "#103745" }}
          >
            Configuracion de Empresa
          </h1>
          <p className="text-sm max-w-lg" style={{ color: "#416474" }}>
            Gestiona tus entidades organizacionales, prefijos operativos y estados
            de visibilidad dentro de la arquitectura.
          </p>
        </div>
        <button
          className="px-6 py-3 rounded-lg font-bold text-sm tracking-wide flex items-center gap-2 text-white transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #0060b0, #4e9af9)",
            boxShadow: "0 0 0 0 rgba(0,96,176,0)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,96,176,0.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 0 0 rgba(0,96,176,0)")
          }
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            add
          </span>
          Nueva Empresa
        </button>
      </div>

      {/* Estado de carga / error */}
      {loading && (
        <div className="flex items-center gap-3 py-16 justify-center text-on-surface-variant">
          <span className="material-symbols-outlined animate-spin" style={{ fontSize: 24 }}>
            progress_activity
          </span>
          <span className="text-sm">Cargando empresas...</span>
        </div>
      )}

      {!loading && error && (
        <div
          className="rounded-xl px-6 py-4 text-sm font-medium"
          style={{ background: "rgba(250,116,111,0.12)", color: "#a83836" }}
        >
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <>
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: "#ffffff",
              boxShadow: "0px 20px 40px rgba(16,55,69,0.04)",
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ background: "rgba(231,246,255,0.5)" }}>
                    {["Prefijo", "Nombre", "Estatus", "Acciones"].map((col) => (
                      <th
                        key={col}
                        className={`px-8 py-5 text-xs font-bold uppercase tracking-[0.1em] ${
                          col === "Acciones" ? "text-right" : ""
                        }`}
                        style={{ color: "#416474", fontFamily: "Inter" }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tenants.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-8 py-12 text-center text-sm"
                        style={{ color: "#416474" }}
                      >
                        No hay empresas registradas.
                      </td>
                    </tr>
                  )}
                  {tenants.map((emp, idx) => {
                    const av = avatarStyle(idx);
                    const initials = getInitials(emp.name);
                    return (
                      <tr
                        key={emp._id}
                        className="transition-colors"
                        style={{ borderTop: "1px solid var(--color-surface-container)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#e7f6ff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {/* Prefijo */}
                        <td
                          className="px-8 py-6 font-bold"
                          style={{ fontFamily: "Manrope", color: "#0060b0" }}
                        >
                          {emp["tenant-prefix"]}
                        </td>

                        {/* Nombre */}
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded flex items-center justify-center font-bold text-xs"
                              style={{ background: av.bg, color: av.color }}
                            >
                              {initials}
                            </div>
                            <span className="font-medium" style={{ color: "#103745" }}>
                              {emp.name}
                            </span>
                          </div>
                        </td>

                        {/* Estatus */}
                        <td className="px-8 py-6">
                          {emp.status ? (
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                              style={{ background: "#ddfcde", color: "#48624b" }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: "#4b654e" }}
                              />
                              Activo
                            </span>
                          ) : (
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                              style={{ background: "#c3e8fb", color: "#416474" }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: "#5d8090" }}
                              />
                              Inactivo
                            </span>
                          )}
                        </td>

                        {/* Acciones */}
                        <td className="px-8 py-6 text-right">
                          <div
                            className="flex justify-end gap-3 transition-opacity"
                            style={{ opacity: 0.35 }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
                          >
                            <button
                              title="Editar"
                              className="p-2 rounded-lg transition-all"
                              style={{ color: "#416474" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#ceedfd";
                                e.currentTarget.style.color = "#0060b0";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "#416474";
                              }}
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: 20 }}
                              >
                                edit
                              </span>
                            </button>

                            {emp.status ? (
                              <button
                                title="Desactivar"
                                className="p-2 rounded-lg transition-all"
                                style={{ color: "#416474" }}
                                onClick={() => handleToggleStatus(emp)}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(250,116,111,0.15)";
                                  e.currentTarget.style.color = "#a83836";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "transparent";
                                  e.currentTarget.style.color = "#416474";
                                }}
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: 20 }}
                                >
                                  block
                                </span>
                              </button>
                            ) : (
                              <button
                                title="Activar"
                                className="p-2 rounded-lg transition-all"
                                style={{ color: "#416474" }}
                                onClick={() => handleToggleStatus(emp)}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#ddfcde";
                                  e.currentTarget.style.color = "#4b654e";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "transparent";
                                  e.currentTarget.style.color = "#416474";
                                }}
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: 20 }}
                                >
                                  check_circle
                                </span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginador */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-xs" style={{ color: "#416474" }}>
                Mostrando {tenants.length} de {pagination.total} registros — Página{" "}
                {pagination.page} de {pagination.totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => fetchTenants(pagination.page - 1)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
                  style={{
                    background: "#e7f6ff",
                    color: "#0060b0",
                  }}
                >
                  Anterior
                </button>
                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => fetchTenants(pagination.page + 1)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
                  style={{
                    background: "#0060b0",
                    color: "#fff",
                  }}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Wallet,
  X,
} from "lucide-react";
import { NavLink } from "react-router";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-border bg-surface transition-transform duration-200 md:static md:z-auto md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
              <Wallet size={18} />
            </div>

            <span className="text-lg font-bold tracking-tight text-primary-text">
              Finly
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-secondary hover:bg-surface-hover hover:text-primary-text md:hidden"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
            General
          </p>

          <div className="space-y-1">
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-secondary hover:bg-surface-hover hover:text-primary-text"
                }`
              }
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/transactions"
              onClick={onClose}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-secondary hover:bg-surface-hover hover:text-primary-text"
                }`
              }
            >
              <CreditCard size={18} />
              Transacciones
            </NavLink>

            <NavLink
              to="/budgets"
              onClick={onClose}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-secondary hover:bg-surface-hover hover:text-primary-text"
                }`
              }
            >
              <Wallet size={18} />
              Presupuestos
            </NavLink>

            <NavLink
              to="/analytics"
              onClick={onClose}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-secondary hover:bg-surface-hover hover:text-primary-text"
                }`
              }
            >
              <BarChart3 size={18} />
              Analíticas
            </NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
}

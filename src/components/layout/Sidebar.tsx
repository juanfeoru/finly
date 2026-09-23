import { BarChart3, CreditCard, LayoutDashboard, Wallet } from "lucide-react";
import { NavLink } from "react-router";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex h-16 items-center border-b border-border px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
            <Wallet size={18} />
          </div>

          <span className="text-lg font-bold tracking-tight text-primary-text">
            Finly
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
          General
        </p>

        <div className="space-y-1">
          <NavLink
            to="/"
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
  );
}

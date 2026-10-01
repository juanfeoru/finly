import { Link } from "react-router";
import { Wallet } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

interface BudgetOverviewProps {
  totalBudget: number;
  totalSpent: number;
  percentage: number;
  remaining: number;
  exceeded: number;
}

export default function BudgetOverview({
  totalBudget,
  totalSpent,
  percentage,
  remaining,
  exceeded,
}: BudgetOverviewProps) {
  const hasBudgets = totalBudget > 0;
  const isExceeded = exceeded > 0;

  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Wallet size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-primary-text">
              Presupuesto del mes
            </h3>

            <p className="mt-0.5 text-xs text-secondary">
              Controla tus gastos del período actual.
            </p>
          </div>
        </div>

        <Link
          to="/budgets"
          className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
        >
          Ver presupuestos
        </Link>
      </div>

      {!hasBudgets ? (
        <div className="px-5 py-8 text-center">
          <p className="text-sm font-medium text-primary-text">
            No tienes presupuestos configurados
          </p>

          <p className="mt-1 text-sm text-secondary">
            Crea un presupuesto para empezar a controlar tus gastos.
          </p>

          <Link
            to="/budgets"
            className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Crear presupuesto
          </Link>
        </div>
      ) : (
        <div className="px-5 py-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-2xl font-semibold text-primary-text">
                {formatCurrency(totalSpent)}
              </p>

              <p className="mt-1 text-xs text-secondary">
                de {formatCurrency(totalBudget)}
              </p>
            </div>

            <p
              className={`text-sm font-semibold ${
                isExceeded ? "text-danger" : "text-secondary"
              }`}
            >
              {Math.round(percentage)}%
            </p>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-hover">
            <div
              className={`h-full rounded-full transition-all ${
                isExceeded ? "bg-danger" : "bg-primary"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <p
              className={`text-xs ${
                isExceeded ? "font-medium text-danger" : "text-secondary"
              }`}
            >
              {isExceeded
                ? `Excediste tu presupuesto por ${formatCurrency(exceeded)}`
                : `Te quedan ${formatCurrency(remaining)}`}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

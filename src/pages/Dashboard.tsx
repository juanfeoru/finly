import { Link, useOutletContext } from "react-router";
import SummaryCard from "../components/dashboard/SummaryCard";
import { useFinancialSummary } from "../hooks/useFinancialSummary";
import type { Transaction } from "../types/transaction";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { Plus } from "lucide-react";

interface AppLayoutContext {
  transactions: Transaction[];
}

export default function Dashboard() {
  const { transactions } = useOutletContext<AppLayoutContext>();

  const { totalIncome, totalExpense, balance } =
    useFinancialSummary(transactions);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-text">
          Resumen financiero
        </h2>

        <p className="mt-1 text-sm text-secondary">
          Aquí tienes un resumen de tus finanzas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard title="Balance" value={balance} type="balance" />

        <SummaryCard title="Ingresos" value={totalIncome} type="income" />

        <SummaryCard title="Gastos" value={totalExpense} type="expense" />
      </div>

      {transactions.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface mt-6">
          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
            <div>
              <h3 className="text-sm font-semibold text-primary-text">
                Transacciones recientes
              </h3>

              <p className="mt-1 text-xs text-secondary">
                Tus últimos movimientos.
              </p>
            </div>

            <Link
              to="/transactions"
              className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              Ver todas
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-surface-hover text-secondary">
              <Plus size={20} />
            </div>

            <h4 className="text-sm font-semibold text-primary-text">
              No tienes transacciones
            </h4>

            <p className="mt-1 max-w-sm text-sm text-secondary">
              Agrega tu primera transacción para comenzar a llevar el control de
              tus finanzas.
            </p>

            <Link
              to="/transactions"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              <Plus size={16} />
              Agregar transacción
            </Link>
          </div>
        </div>
      ) : (
        <RecentTransactions transactions={transactions} />
      )}
    </div>
  );
}

import { Link, useOutletContext } from "react-router";
import SummaryCard from "../components/dashboard/SummaryCard";
import { useFinancialSummary } from "../hooks/useFinancialSummary";
import type { Transaction } from "../types/transaction";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { Plus } from "lucide-react";
import type { Budget } from "../types/budget";
import { getBudgetSpent } from "../utils/budgets";
import BudgetOverview from "../components/dashboard/BudgetOverview";

interface AppLayoutContext {
  transactions: Transaction[];
  budgets: Budget[];
  openTransactionForm: () => void;
}

export default function Dashboard() {
  const { transactions, budgets, openTransactionForm } =
    useOutletContext<AppLayoutContext>();

  const { totalIncome, totalExpense, balance } =
    useFinancialSummary(transactions);

  const date = new Date();

  const currentMonth = `${date.getFullYear()}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}`;

  const totalBudget = budgets.reduce(
    (total, budget) => total + budget.limit,
    0,
  );

  const totalBudgetSpent = budgets.reduce(
    (total, budget) =>
      total + getBudgetSpent(budget, transactions, currentMonth),
    0,
  );

  const budgetPercentage =
    totalBudget === 0
      ? 0
      : Math.min((totalBudgetSpent / totalBudget) * 100, 100);

  const remainingBudget = Math.max(totalBudget - totalBudgetSpent, 0);

  const exceededBudget = Math.max(totalBudgetSpent - totalBudget, 0);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary-text">
            Resumen financiero
          </h2>

          <p className="mt-1 text-sm text-secondary">
            Aquí tienes un resumen de tus finanzas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openTransactionForm()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 sm:w-auto cursor-pointer"
        >
          <Plus size={16} />
          Añadir transacción
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard title="Balance" value={balance} type="balance" />

        <SummaryCard title="Ingresos" value={totalIncome} type="income" />

        <SummaryCard title="Gastos" value={totalExpense} type="expense" />
      </div>

      <BudgetOverview
        totalBudget={totalBudget}
        totalSpent={totalBudgetSpent}
        percentage={budgetPercentage}
        remaining={remainingBudget}
        exceeded={exceededBudget}
      />

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

            <button
              type="button"
              onClick={() => openTransactionForm()}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 cursor-pointer"
            >
              <Plus size={16} />
              Agregar transacción
            </button>
          </div>
        </div>
      ) : (
        <RecentTransactions
          transactions={transactions}
          openTransactionForm={openTransactionForm}
        />
      )}
    </div>
  );
}

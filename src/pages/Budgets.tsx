import { useOutletContext } from "react-router";
import BudgetCard from "../components/budgets/BudgetCard";
import type { Transaction } from "../types/transaction";
import type { Budget } from "../types/budget";
import { useState } from "react";
import AddBudgetForm from "../components/budgets/AddBudgetForm";
import DeleteBudgetModal from "../components/budgets/DeleteBudgetModal";
import BudgetEmpty from "../components/budgets/BudgetEmpty";
import { CircleDollarSign, Plus, TrendingDown, Wallet } from "lucide-react";
import { isTransactionInMonth } from "../utils/transactions";
import { formatCurrency } from "../utils/formatters";

interface AppLayoutContext {
  transactions: Transaction[];
  budgets: Budget[];
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
}

export default function Budgets() {
  const { transactions, budgets, setBudgets } =
    useOutletContext<AppLayoutContext>();

  const [isAdding, setIsAdding] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState<Budget | null>(null);
  const [budgetToDelete, setBudgetToDelete] = useState<Budget | null>(null);

  const date = new Date();

  const currentMonth = `${date.getFullYear()}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}`;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  function handleAddBudget(budget: Budget) {
    if (budgetToEdit) {
      setBudgets((prev) =>
        prev.map((item) => (item.id === budget.id ? budget : item)),
      );

      setBudgetToEdit(null);
      setIsAdding(false);

      return true;
    }

    const alreadyExists = budgets.some(
      (item) => item.category === budget.category,
    );

    if (alreadyExists) {
      return false;
    }

    setBudgets((prev) => [...prev, budget]);
    setIsAdding(false);

    return true;
  }

  function getMonthOptions() {
    const options = [];
    const currentDate = new Date();

    for (let i = 0; i < 12; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1,
      );

      const value = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}`;

      const label = new Intl.DateTimeFormat("es-CO", {
        month: "long",
        year: "numeric",
      }).format(date);

      options.push({
        value,
        label: label.charAt(0).toUpperCase() + label.slice(1),
      });
    }

    return options;
  }

  const monthOptions = getMonthOptions();

  const totalBudget = budgets.reduce(
    (total, budget) => total + budget.limit,
    0,
  );

  const totalSpent = budgets.reduce((total, budget) => {
    const spent = transactions
      .filter(
        (transaction) =>
          transaction.type === "expense" &&
          transaction.category === budget.category &&
          isTransactionInMonth(transaction.date, selectedMonth),
      )
      .reduce((total, transaction) => total + transaction.value, 0);

    return total + spent;
  }, 0);

  const remainingBudget = Math.max(totalBudget - totalSpent, 0);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary-text">Presupuestos</h2>

          <p className="mt-1 text-sm text-secondary">
            Controla cuánto gastas en cada categoría.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-primary-text outline-none transition-colors hover:border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer sm:w-auto"
          >
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 cursor-pointer sm:w-auto"
          >
            <Plus size={16} />
            Nuevo presupuesto
          </button>
        </div>
      </div>

      <div className="mb-6 overflow-hidden rounded-xl border border-border bg-surface">
        <div className="border-b border-border px-5 py-3">
          <p className="text-sm font-medium text-primary-text">
            Resumen del mes
          </p>

          <p className="mt-0.5 text-xs text-secondary">
            Así va tu presupuesto en el período seleccionado.
          </p>
        </div>

        <div className="grid sm:grid-cols-3">
          <div className="px-5 py-4 sm:border-r sm:border-border">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Wallet size={18} />
              </div>

              <p className="text-sm font-medium text-secondary">
                Presupuesto total
              </p>
            </div>

            <p className="mt-4 text-2xl font-semibold text-primary-text">
              {formatCurrency(totalBudget)}
            </p>
          </div>

          <div className="border-t border-border px-5 py-4 sm:border-t-0 sm:border-r">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-danger/10 text-danger">
                <TrendingDown size={18} />
              </div>

              <p className="text-sm font-medium text-secondary">Gastado</p>
            </div>

            <p className="mt-4 text-2xl font-semibold text-primary-text">
              {formatCurrency(totalSpent)}
            </p>
          </div>

          <div className="border-t border-border px-5 py-4 sm:border-t-0">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-success/10 text-success">
                <CircleDollarSign size={18} />
              </div>

              <p className="text-sm font-medium text-secondary">Disponible</p>
            </div>

            <p className="mt-4 text-2xl font-semibold text-primary-text">
              {formatCurrency(remainingBudget)}
            </p>
          </div>
        </div>
      </div>

      {budgets.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => {
            const spent = transactions
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === budget.category &&
                  isTransactionInMonth(transaction.date, selectedMonth),
              )
              .reduce((total, transaction) => total + transaction.value, 0);

            return (
              <BudgetCard
                key={budget.id}
                category={budget.category}
                limit={budget.limit}
                spent={spent}
                onEdit={() => {
                  setBudgetToEdit(budget);
                  setIsAdding(true);
                }}

                onDelete={() => setBudgetToDelete(budget)}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-surface">
          <BudgetEmpty />
        </div>
      )}

      {isAdding && (
        <AddBudgetForm
          key={budgetToEdit?.id ?? "new"}
          budgetToEdit={budgetToEdit}
          onCancel={() => {
            setIsAdding(false);
            setBudgetToEdit(null);
          }}
          onAddBudget={handleAddBudget}
        />
      )}

      {budgetToDelete && (
        <DeleteBudgetModal
          budget={budgetToDelete}
          onCancel={() => setBudgetToDelete(null)}
          onConfirm={() => {
            setBudgets((prev) =>
              prev.filter((budget) => budget.id !== budgetToDelete.id),
            );

            setBudgetToDelete(null);
          }}
        />
      )}
    </div>
  );
}

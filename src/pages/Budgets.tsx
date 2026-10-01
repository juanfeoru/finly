import { useOutletContext } from "react-router";
import BudgetCard from "../components/budgets/BudgetCard";
import type { Transaction } from "../types/transaction";
import type { Budget } from "../types/budget";
import { useState } from "react";
import AddBudgetForm from "../components/budgets/AddBudgetForm";
import DeleteBudgetModal from "../components/budgets/DeleteBudgetModal";
import BudgetEmpty from "../components/budgets/BudgetEmpty";
import { Plus } from "lucide-react";
import { isCurrentMonth } from "../utils/transactions";

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

      {budgets.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => {
            const spent = transactions
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === budget.category &&
                  isCurrentMonth(transaction.date, selectedMonth),
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

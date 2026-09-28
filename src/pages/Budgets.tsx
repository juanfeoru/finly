import { useOutletContext } from "react-router";
import BudgetCard from "../components/budgets/BudgetCard";
import type { Transaction } from "../types/transaction";
import type { Budget } from "../types/budget";
import { useState } from "react";
import AddBudgetForm from "../components/budgets/AddBudgetForm";
import DeleteBudgetModal from "../components/budgets/DeleteBudgetModal";

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

  function handleAddBudget(budget: Budget) {
    if (budgetToEdit) {
      setBudgets((prev) =>
        prev.map((item) => (item.id === budget.id ? budget : item)),
      );

      setBudgetToEdit(null);
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

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary-text">Presupuestos</h2>

          <p className="mt-1 text-sm text-secondary">
            Controla cuánto gastas en cada categoría.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 sm:w-auto cursor-pointer"
        >
          Nuevo presupuesto
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const spent = transactions
            .filter(
              (transaction) =>
                transaction.type === "expense" &&
                transaction.category === budget.category,
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

      {isAdding && (
        <AddBudgetForm
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

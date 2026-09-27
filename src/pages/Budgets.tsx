import { useOutletContext } from "react-router";
import BudgetCard from "../components/budgets/BudgetCard";
import { budgets } from "../data/budgets";
import type { Transaction } from "../types/transaction";

interface AppLayoutContext {
  transactions: Transaction[];
}

export default function Budgets() {
  const { transactions } = useOutletContext<AppLayoutContext>();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-text">Presupuestos</h2>

        <p className="mt-1 text-sm text-secondary">
          Controla cuánto gastas en cada categoría.
        </p>
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
            />
          );
        })}{" "}
      </div>
    </div>
  );
}

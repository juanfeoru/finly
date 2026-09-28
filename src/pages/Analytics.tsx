import { useOutletContext } from "react-router";
import { useAnalytics } from "../hooks/useAnalytics";
import ExpensesByCategoryChart from "../components/analytics/ExpensesByCategoryChart";
import type { Transaction } from "../types/transaction";
import IncomeVsExpenseChart from "../components/analytics/IncomeVsExpenseChart";

interface AppLayoutContext {
  transactions: Transaction[];
}

export default function Analytics() {
  const { transactions } = useOutletContext<AppLayoutContext>();

  const { totalExpenses, expensesByCategory, incomeVsExpense } =
    useAnalytics(transactions);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-text">Analíticas</h2>

        <p className="mt-1 text-sm text-secondary">
          Analiza cómo estás distribuyendo tus gastos.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ExpensesByCategoryChart
          data={expensesByCategory}
          totalExpenses={totalExpenses}
        />

        <IncomeVsExpenseChart data={incomeVsExpense} />
      </div>{" "}
    </div>
  );
}

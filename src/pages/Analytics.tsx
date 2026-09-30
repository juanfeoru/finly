import { useOutletContext } from "react-router";
import { useAnalytics } from "../hooks/useAnalytics";
import ExpensesByCategoryChart from "../components/analytics/ExpensesByCategoryChart";
import type { Transaction } from "../types/transaction";
import IncomeVsExpenseChart from "../components/analytics/IncomeVsExpenseChart";
import IncomeVsExpenseOverTimeChart from "../components/analytics/IncomeVsExpenseOverTimeChart";
import { useState } from "react";

interface AppLayoutContext {
  transactions: Transaction[];
}

type AnalyticsPeriod = "this-month" | "last-month" | "last-30-days" | "all";

export default function Analytics() {
  const { transactions } = useOutletContext<AppLayoutContext>();

  const [period, setPeriod] = useState<AnalyticsPeriod>("this-month");

  const filteredTransactions = transactions.filter((transaction) => {
    const now = new Date();
    const transactionDate = new Date(`${transaction.date}T00:00:00`);

    if (period === "all") {
      return true;
    }

    if (period === "this-month") {
      return (
        transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear()
      );
    }

    if (period === "last-month") {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      return (
        transactionDate.getMonth() === lastMonth.getMonth() &&
        transactionDate.getFullYear() === lastMonth.getFullYear()
      );
    }

    if (period === "last-30-days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);

      return transactionDate >= thirtyDaysAgo && transactionDate <= now;
    }

    return true;
  });

  const {
    totalExpenses,
    expensesByCategory,
    incomeVsExpense,
    incomeVsExpenseOverTime,
  } = useAnalytics(filteredTransactions);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary-text">Analíticas</h2>

          <p className="mt-1 text-sm text-secondary">
            Analiza cómo estás distribuyendo tus gastos.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <label
            htmlFor="analytics-period"
            className="mb-1.5 block text-xs font-medium text-secondary"
          >
            Período
          </label>

          <select
            id="analytics-period"
            value={period}
            onChange={(event) =>
              setPeriod(event.target.value as AnalyticsPeriod)
            }
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-primary-text outline-none transition-colors focus:border-primary sm:w-44"
          >
            <option value="this-month">Este mes</option>
            <option value="last-month">Mes anterior</option>
            <option value="last-30-days">Últimos 30 días</option>
            <option value="all">Todo</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ExpensesByCategoryChart
          data={expensesByCategory}
          totalExpenses={totalExpenses}
        />

        <IncomeVsExpenseChart data={incomeVsExpense} />

        <IncomeVsExpenseOverTimeChart data={incomeVsExpenseOverTime} />
      </div>
    </div>
  );
}

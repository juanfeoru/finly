import { useOutletContext } from "react-router";
import SummaryCard from "../components/dashboard/SummaryCard";
import { useFinancialSummary } from "../hooks/useFinancialSummary";
import type { Transaction } from "../types/transaction";

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
    </div>
  );
}

import type { Transaction } from "../../types/transaction";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="font-semibold text-primary-text">
            Transacciones recientes
          </h3>
          <p className="mt-1 text-sm text-secondary">
            Tus últimos movimientos.
          </p>
        </div>
        <button
          type="button"
          className="text-sm font-medium text-primary hover:underline cursor-pointer"
        >
          Ver todas
        </button>
      </div>
      <div className="divide-y divide-border">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between gap-4 px-5 py-4"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-primary-text">
                {transaction.description}
              </p>
              <p className="mt-1 text-xs text-secondary">{transaction.date}</p>
            </div>
            <p
              className={`shrink-0 text-sm font-semibold ${transaction.type === "income" ? "text-success" : "text-danger"}`}
            >
              {transaction.type === "income" ? "+" : "-"}${" "}
              {transaction.value.toLocaleString("es-CO")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

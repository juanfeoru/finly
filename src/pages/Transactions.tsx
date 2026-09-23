import { useOutletContext } from "react-router";
import type { Transaction } from "../types/transaction";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import TransactionEmpty from "../components/transactions/TransactionEmpty";

interface AppLayoutContext {
  transactions: Transaction[];
}

export default function Transactions() {
  const { transactions } = useOutletContext<AppLayoutContext>();

  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description
      .trim()
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary-text">
            Transacciones
          </h2>

          <p className="mt-1 text-sm text-secondary">
            Consulta y administra tus movimientos.
          </p>
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 sm:w-auto cursor-pointer"
        >
          + Añadir transacción
        </button>
      </div>

      <div className="mb-4 rounded-xl border border-border bg-surface p-4">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar transacciones..."
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-primary-text outline-none placeholder:text-muted focus:border-primary"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        {sortedTransactions.length === 0 ? (
          <TransactionEmpty search={search} />
        ) : (
          sortedTransactions.map((transaction) => {
            const isIncome = transaction.type === "income";
            const Icon = isIncome ? ArrowUpRight : ArrowDownRight;
            return (
              <div
                key={transaction.id}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-hover"
              >
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${isIncome ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}
                >
                  <Icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-primary-text">
                    {transaction.description}
                  </p>
                  <p className="mt-1 text-xs text-secondary">
                    {transaction.category} · {transaction.date}
                  </p>
                </div>
                <p
                  className={`shrink-0 text-sm font-semibold ${isIncome ? "text-success" : "text-danger"}`}
                >
                  {isIncome ? "+" : "-"}$
                  {transaction.value.toLocaleString("es-CO")}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

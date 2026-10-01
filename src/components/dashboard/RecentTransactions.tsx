import { Link } from "react-router";
import type { Transaction } from "../../types/transaction";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { ArrowDownRight, ArrowUpRight, Edit2 } from "lucide-react";
import { CATEGORY_NAMES } from "../../constants/categories";
import { sortTransactionsByDate } from "../../utils/transactions";

interface RecentTransactionsProps {
  transactions: Transaction[];
  openTransactionForm: (transaction: Transaction) => void;
}

export default function RecentTransactions({
  transactions,
  openTransactionForm,
}: RecentTransactionsProps) {
  const recentTransactions = sortTransactionsByDate(transactions).slice(0, 5);

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
        <Link
          to="/transactions"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Ver todas
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="divide-y divide-border">
          {recentTransactions.map((transaction) => {
            const isIncome = transaction.type === "income";
            const Icon = isIncome ? ArrowUpRight : ArrowDownRight;
            return (
              <div
                key={transaction.id}
                className="flex min-w-90 items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-hover"
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
                    {CATEGORY_NAMES[transaction.category]} ·{" "}
                    {formatDate(transaction.date)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                  <p
                    className={`text-sm font-semibold ${
                      isIncome ? "text-success" : "text-danger"
                    }`}
                  >
                    {isIncome ? "+" : "-"}
                    {formatCurrency(transaction.value)}
                  </p>

                  <button
                    type="button"
                    onClick={() => openTransactionForm(transaction)}
                    className="flex size-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-surface-hover hover:text-primary-text cursor-pointer"
                    aria-label="Editar transacción"
                  >
                    <Edit2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

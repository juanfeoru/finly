import { useOutletContext } from "react-router";
import type { Transaction, TransactionCategory } from "../types/transaction";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import TransactionEmpty from "../components/transactions/TransactionEmpty";

interface AppLayoutContext {
  transactions: Transaction[];
}

type TransactionFilter = "all" | "income" | "expense";

type CategoryFilter = "all" | TransactionCategory;

export default function Transactions() {
  const { transactions } = useOutletContext<AppLayoutContext>();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .trim()
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    const marchesCategory =
      categoryFilter === "all" || transaction.category === categoryFilter;

    return matchesSearch && matchesType && marchesCategory;
  });

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
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar transacciones..."
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-primary-text outline-none placeholder:text-muted focus:border-primary"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TransactionFilter)}
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-primary-text outline-none focus:border-primary cursor-pointer"
          >
            <option value="all">Todos</option>
            <option value="income">Ingresos</option>
            <option value="expense">Gastos</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value as CategoryFilter)
            }
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-primary-text outline-none focus:border-primary cursor-pointer"
          >
            <option value="all">Todas las categorías</option>
            <option value="food">Alimentación</option>
            <option value="transportation">Transporte</option>
            <option value="entertainment">Entretenimiento</option>
            <option value="health">Salud</option>
            <option value="education">Educación</option>
            <option value="housing">Vivienda</option>
            <option value="shopping">Compras</option>
            <option value="subscriptions">Suscripciones</option>
            <option value="salary">Salario</option>
            <option value="freelance">Freelance</option>
            <option value="investment">Inversiones</option>
            <option value="other">Otros</option>
          </select>
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

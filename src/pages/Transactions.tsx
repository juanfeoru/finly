import { useOutletContext } from "react-router";
import type { Transaction, TransactionCategory } from "../types/transaction";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Edit2,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import TransactionEmpty from "../components/transactions/TransactionEmpty";
import DeleteTransactionModal from "../components/transactions/DeleteTransactionModal";
import { formatCurrency, formatDate } from "../utils/formatters";
import { CATEGORY_NAMES } from "../constants/categories";
import { sortTransactionsByDate } from "../utils/transactions";
import Pagination from "../components/ui/Pagination";
import { exportTransactionsToCSV } from "../utils/csv";

interface AppLayoutContext {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  openTransactionForm: (transaction?: Transaction) => void;
}

type TransactionFilter = "all" | "income" | "expense";

type CategoryFilter = "all" | TransactionCategory;

export default function Transactions() {
  const { transactions, setTransactions, openTransactionForm } =
    useOutletContext<AppLayoutContext>();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<TransactionFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .trim()
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    const matchesCategory =
      categoryFilter === "all" || transaction.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  const transactionPerPage = 10;

  const sortedTransactions = sortTransactionsByDate(filteredTransactions);

  const totalPages = Math.ceil(sortedTransactions.length / transactionPerPage);

  const startIndex = (currentPage - 1) * transactionPerPage;

  const paginatedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + transactionPerPage,
  );

  useEffect(() => {
    if (transactionToDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [transactionToDelete]);

  function handleDeleteTransaction(id: number) {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id),
    );
  }

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

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={() => exportTransactionsToCSV(transactions)}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-primary-text transition-colors hover:bg-surface-hover sm:w-auto"
          >
            <Download size={16} />
            Exportar
          </button>

          <button
            type="button"
            onClick={() => openTransactionForm()}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 sm:w-auto"
          >
            <Plus size={16} />
            Añadir transacción
          </button>
        </div>
      </div>
      <div className="mb-4 rounded-xl border border-border bg-surface p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Buscar transacciones..."
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-primary-text outline-none placeholder:text-muted focus:border-primary"
          />

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as TransactionFilter);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-primary-text outline-none focus:border-primary cursor-pointer"
          >
            <option value="all">Todos</option>
            <option value="income">Ingresos</option>
            <option value="expense">Gastos</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value as CategoryFilter);
              setCurrentPage(1);
            }}
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
          <TransactionEmpty
            search={search}
            hasFilters={typeFilter !== "all" || categoryFilter !== "all"}
          />
        ) : (
          <div className="overflow-x-auto">
            {paginatedTransactions.map((transaction) => {
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
                  <div className="flex shrink-0 items-center gap-2">
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

                    <button
                      type="button"
                      onClick={() => setTransactionToDelete(transaction)}
                      className="flex size-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-danger/10 hover:text-danger cursor-pointer"
                      aria-label="Eliminar transacción"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {transactionToDelete && (
        <DeleteTransactionModal
          transaction={transactionToDelete}
          onCancel={() => setTransactionToDelete(null)}
          onConfirm={() => {
            handleDeleteTransaction(transactionToDelete.id);
            setTransactionToDelete(null);
          }}
        />
      )}
    </div>
  );
}

import { SearchX } from "lucide-react";

interface TransactionEmptyProps {
  search: string;
  hasFilters: boolean;
}

export default function TransactionEmpty({
  search,
  hasFilters,
}: TransactionEmptyProps) {
  const hasSearch = search.trim().length > 0;

  const hasActiveFilter = hasSearch || hasFilters;

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-surface-hover text-secondary">
        <span>
          <SearchX size={26} />
        </span>
      </div>

      <h3 className="text-sm font-semibold text-primary-text">
        {hasActiveFilter
          ? "No encontramos transacciones"
          : "No tienes transacciones"}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-secondary">
        {hasSearch
          ? `No hay resultados para "${search.trim()}".`
          : hasFilters
            ? "No hay transacciones que coincidan con los filtros seleccionados."
            : "Aquí aparecerán tus movimientos cuando agregues una transacción."}
      </p>
    </div>
  );
}

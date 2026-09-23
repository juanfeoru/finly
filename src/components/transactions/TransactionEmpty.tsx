interface TransactionEmptyProps {
  search: string;
}

export default function TransactionEmpty({ search }: TransactionEmptyProps) {
  const hasSearch = search.trim().length > 0;

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-surface-hover text-secondary">
        <span className="text-xl">?</span>
      </div>

      <h3 className="text-sm font-semibold text-primary-text">
        {hasSearch ? "No encontramos transacciones" : "No tienes transacciones"}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-secondary">
        {hasSearch
          ? `No hay resultados para "${search.trim()}".`
          : "Aquí aparecerán tus movimientos cuando agregues una transacción."}
      </p>
    </div>
  );
}

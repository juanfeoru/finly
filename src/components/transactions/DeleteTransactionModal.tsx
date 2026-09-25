import { AlertTriangle, X } from "lucide-react";
import type { Transaction } from "../../types/transaction";

interface DeleteTransactionModalProps {
  transaction: Transaction;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteTransactionModal({
  transaction,
  onCancel,
  onConfirm,
}: DeleteTransactionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <section className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-danger/10 text-danger">
              <AlertTriangle size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-primary-text">
                Eliminar transacción
              </h3>
              <p className="mt-1 text-sm text-secondary">
                Esta acción no se puede deshacer.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-surface-hover hover:text-primary-text cursor-pointer"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 rounded-lg border border-border bg-background p-4">
          <p className="text-xs text-secondary">Transacción</p>

          <p className="mt-1 truncate text-sm font-medium text-primary-text">
            {transaction.description}
          </p>

          <p className="mt-1 text-sm text-secondary">
            {transaction.type === "income" ? "+" : "-"}$
            {transaction.value.toLocaleString("es-CO")}
          </p>
        </div>

        <p className="mt-4 text-sm leading-5 text-secondary">
          ¿Estás seguro de que quieres eliminar esta transacción?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-surface-hover hover:text-primary-text cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-danger/90 cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </section>
    </div>
  );
}

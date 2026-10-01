import { Wallet } from "lucide-react";

export default function BudgetEmpty() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-surface-hover text-secondary">
        <Wallet size={24} />
      </div>

      <h3 className="text-sm font-semibold text-primary-text">
        No tienes presupuestos
      </h3>

      <p className="mt-1 max-w-sm text-sm text-secondary">
        Crea tu primer presupuesto para comenzar a controlar tus gastos.
      </p>
    </div>
  );
}

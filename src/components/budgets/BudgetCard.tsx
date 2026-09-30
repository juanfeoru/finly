import { Edit2, Trash2 } from "lucide-react";
import type { TransactionCategory } from "../../types/transaction";
import { formatCurrency } from "../../utils/formatters";

interface BudgetCardProps {
  category: TransactionCategory;
  limit: number;
  spent: number;
  onEdit: () => void;
  onDelete: () => void;
}

const CATEGORY_NAMES: Record<TransactionCategory, string> = {
  food: "Alimentación",
  transportation: "Transporte",
  entertainment: "Entretenimiento",
  health: "Salud",
  education: "Educación",
  housing: "Vivienda",
  shopping: "Compras",
  subscriptions: "Suscripciones",
  salary: "Salario",
  freelance: "Freelance",
  investment: "Inversiones",
  other: "Otros",
};

export default function BudgetCard({
  category,
  limit,
  spent,
  onEdit,
  onDelete,
}: BudgetCardProps) {
  const percentage = Math.min((spent / limit) * 100, 100);
  const remaining = Math.max(limit - spent, 0);

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-primary-text">
            {CATEGORY_NAMES[category]}
          </h3>

          <p className="mt-1 text-xs text-secondary">
            Límite mensual: {formatCurrency(limit)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="flex size-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-surface-hover hover:text-primary-text cursor-pointer"
            aria-label="Editar presupuesto"
          >
            <Edit2 size={15} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex size-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-danger/10 hover:text-danger cursor-pointer"
            aria-label="Eliminar presupuesto"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-3">
        <p className="text-lg font-semibold text-primary-text">
          {formatCurrency(spent)}
        </p>

        <p className="text-xs text-secondary">de {formatCurrency(limit)}</p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-hover">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-secondary">
        Te quedan {formatCurrency(remaining)}
      </p>
    </div>
  );
}

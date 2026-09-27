import type { TransactionCategory } from "../../types/transaction";

interface BudgetCardProps {
  category: TransactionCategory;
  limit: number;
  spent: number;
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
}: BudgetCardProps) {
  const percentage = Math.min((spent / limit) * 100, 100);
  const remaining = Math.max(limit - spent, 0);

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-primary-text">
          {CATEGORY_NAMES[category]}
        </h3>

        <span className="text-xs text-secondary">
          ${limit.toLocaleString("es-CO")}
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <p className="text-lg font-semibold text-primary-text">
          ${spent.toLocaleString("es-CO")}
        </p>

        <p className="text-xs text-secondary">
          de ${limit.toLocaleString("es-CO")}
        </p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-hover">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-secondary">
        Te quedan ${remaining.toLocaleString("es-CO")}
      </p>
    </div>
  );
}

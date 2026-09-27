import { useState } from "react";
import type { Budget } from "../../types/budget";
import type { TransactionCategory } from "../../types/transaction";
import { EXPENSE_CATEGORIES } from "../../constants/categories";

interface AddBudgetFormProps {
  onCancel: () => void;
  onAddBudget: (budget: Budget) => boolean;
}

interface FormData {
  category: TransactionCategory;
  limit: string;
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

export default function AddBudgetForm({
  onCancel,
  onAddBudget,
}: AddBudgetFormProps) {
  const [formData, setFormData] = useState<FormData>({
    category: "food",
    limit: "",
  });

  const [errors, setErrors] = useState({
    category: "",
    limit: "",
  });

  function validateForm() {
    const newErrors = {
      category: "",
      limit: "",
    };

    if (!formData.limit.trim() || Number(formData.limit) <= 0) {
      newErrors.limit = "Agrega un límite válido";
    }

    setErrors(newErrors);

    return !newErrors.category && !newErrors.limit;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">
      <div className="flex min-h-full items-center justify-center">
        <section className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-xl">
          <div className="mb-5">
            <h3 className="font-semibold text-primary-text">
              Nuevo presupuesto
            </h3>

            <p className="mt-1 text-sm text-secondary">
              Define un límite mensual para una categoría.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (!validateForm()) {
                return;
              }

              const budget: Budget = {
                id: Date.now(),
                category: formData.category,
                limit: Number(formData.limit),
              };

              const success = onAddBudget(budget);

              if (!success) {
                setErrors({
                  category: "Ya existe un presupuesto para esta categoría.",
                  limit: "",
                });

                return;
              }
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="category"
                className="mb-1.5 block text-sm font-medium text-primary-text"
              >
                Categoría
              </label>

              <select
                id="category"
                value={formData.category}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value as TransactionCategory,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    category: "",
                  }));
                }}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-primary-text outline-none transition-colors focus:border-primary cursor-pointer"
              >
                {EXPENSE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {CATEGORY_NAMES[category]}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-xs text-danger">{errors.category}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="limit"
                className="mb-1.5 block text-sm font-medium text-primary-text"
              >
                Límite mensual
              </label>

              <input
                id="limit"
                type="number"
                value={formData.limit}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    limit: e.target.value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    limit: "",
                  }));
                }}
                placeholder="500000"
                className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-primary-text outline-none transition-colors placeholder:text-muted focus:border-primary cursor-pointer"
              />

              {errors.limit && (
                <p className="mt-1 text-xs text-danger">{errors.limit}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-surface-hover hover:text-primary-text cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 cursor-pointer"
              >
                Crear presupuesto
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

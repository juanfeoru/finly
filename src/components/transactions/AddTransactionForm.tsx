import { useState } from "react";
import type { Transaction, TransactionCategory } from "../../types/transaction";

interface AddTransactionFormProps {
  onCancel: () => void;
  onAddTransaction: (transaction: Transaction) => void;
}

type TransactionType = "income" | "expense";

interface FormData {
  description: string;
  value: string;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
}

export default function AddTransactionForm({
  onCancel,
  onAddTransaction,
}: AddTransactionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    description: "",
    value: "",
    type: "expense",
    category: "food",
    date: "",
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">
      <div className="flex min-h-full items-center justify-center">
        <section className="w-full max-w-2xl rounded-xl border border-border bg-surface p-5 shadow-xl">
          <div className="mb-5">
            <h3 className="font-semibold text-primary-text">
              Nueva transacción
            </h3>
            <p className="mt-1 text-sm text-secondary">
              Registra un nuevo ingreso o gasto.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              const newTransaction: Transaction = {
                id: Date.now(),
                description: formData.description,
                value: Number(formData.value),
                type: formData.type,
                category: formData.category,
                date: formData.date,
              };

              onAddTransaction(newTransaction);
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-medium text-primary-text"
              >
                Descripción
              </label>
              <input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                type="text"
                placeholder="Ej. Compra de supermercado"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-primary-text outline-none placeholder:text-muted focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="value"
                className="mb-1.5 block text-sm font-medium text-primary-text"
              >
                Valor
              </label>
              <input
                id="value"
                value={formData.value}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    value: e.target.value,
                  }))
                }
                type="number"
                placeholder="0"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-primary-text outline-none placeholder:text-muted focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="mb-1.5 block text-sm font-medium text-primary-text"
              >
                Tipo
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: e.target.value as TransactionType,
                  }))
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-primary-text outline-none focus:border-primary cursor-pointer"
              >
                <option value="expense">Gasto</option>
                <option value="income">Ingreso</option>
              </select>
            </div>

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
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value as TransactionCategory,
                  }))
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-primary-text outline-none focus:border-primary cursor-pointer"
              >
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

            <div>
              <label
                htmlFor="date"
                className="mb-1.5 block text-sm font-medium text-primary-text"
              >
                Fecha
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-primary-text outline-none focus:border-primary cursor-pointer"
              />
            </div>

            <div className="flex items-end justify-end gap-3 sm:col-span-2">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:bg-surface-hover hover:text-primary-text cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 cursor-pointer flex gap-1"
              >
                Guardar <span className="hidden sm:flex"> transacción</span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

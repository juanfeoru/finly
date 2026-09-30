import {
  PieChart,
  Pie,
  Sector,
  Tooltip,
  ResponsiveContainer,
  type PieSectorShapeProps,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";

interface ExpensesByCategoryChartProps {
  data: {
    category: string;
    total: number;
  }[];
  totalExpenses: number;
}

interface ChartData {
  name: string;
  value: number;
  category: string;
}

const CATEGORY_NAMES: Record<string, string> = {
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

const CATEGORY_COLORS: Record<string, string> = {
  food: "#f59e0b",
  transportation: "#3b82f6",
  entertainment: "#8b5cf6",
  health: "#ef4444",
  education: "#06b6d4",
  housing: "#64748b",
  shopping: "#ec4899",
  subscriptions: "#14b8a6",
  investment: "#22c55e",
  freelance: "#a855f7",
  salary: "#10b981",
  other: "#94a3b8",
};

export default function ExpensesByCategoryChart({
  data,
  totalExpenses,
}: ExpensesByCategoryChartProps) {
  const chartData: ChartData[] = data.map((item) => ({
    name: CATEGORY_NAMES[item.category] ?? item.category,
    value: item.total,
    category: item.category,
  }));

  const legendData = data.map((item) => ({
    category: item.category,
    name: CATEGORY_NAMES[item.category] ?? item.category,
    total: item.total,
    percentage: (item.total / totalExpenses) * 100,
  }));

  function renderShape(
    props: PieSectorShapeProps & {
      payload?: ChartData;
    },
  ) {
    if (!props.payload) {
      return <Sector {...props} />;
    }

    return <Sector {...props} fill={CATEGORY_COLORS[props.payload.category]} />;
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-primary-text">
            Gastos por categoría
          </h3>

          <p className="mt-1 text-xs text-secondary">
            Distribución de tus gastos.
          </p>
        </div>

        <div className="flex h-72 flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-surface-hover text-secondary">
            <span className="text-xl">?</span>
          </div>

          <h4 className="text-sm font-semibold text-primary-text">
            No hay gastos registrados
          </h4>

          <p className="mt-1 max-w-xs text-sm text-secondary">
            Aquí aparecerá la distribución de tus gastos cuando registres una
            transacción.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-primary-text">
          Gastos por categoría
        </h3>

        <p className="mt-1 text-xs text-secondary">
          Distribución de tus gastos.
        </p>
      </div>

      <div className="relative h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              shape={renderShape}
            />

            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-primary-text">
            {formatCurrency(totalExpenses)}
          </p>

          <p className="mt-1 text-xs text-secondary">Gastos totales</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
        {legendData.map((item) => (
          <div key={item.category} className="flex min-w-0 items-center gap-2">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{
                backgroundColor: CATEGORY_COLORS[item.category],
              }}
            />

            <span className="min-w-0 truncate text-xs text-secondary">
              {item.name}
            </span>

            <span
              className="ml-auto shrink-0 text-xs font-semibold"
              style={{
                color: CATEGORY_COLORS[item.category],
              }}
            >
              {item.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

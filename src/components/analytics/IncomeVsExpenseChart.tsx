import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartColumn } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

interface IncomeVsExpenseChartProps {
  data: {
    name: string;
    ingresos: number;
    gastos: number;
  }[];
}

export default function IncomeVsExpenseChart({
  data,
}: IncomeVsExpenseChartProps) {
  const hasData = data.some((item) => item.ingresos > 0 || item.gastos > 0);

  if (!hasData) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-primary-text">
            Ingresos vs. Gastos
          </h3>

          <p className="mt-1 text-xs text-secondary">
            Compara tus ingresos y gastos.
          </p>
        </div>

        <div className="flex h-72 flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-surface-hover text-secondary">
            <ChartColumn size={24} />
          </div>

          <h4 className="text-sm font-semibold text-primary-text">
            No hay datos suficientes
          </h4>

          <p className="mt-1 max-w-xs text-sm text-secondary">
            Registra ingresos o gastos para comenzar a comparar tus movimientos.
          </p>
        </div>
      </div>
    );
  }

  const totalIncome = data.reduce((total, item) => total + item.ingresos, 0);

  const totalExpenses = data.reduce((total, item) => total + item.gastos, 0);

  const formatAxisValue = (value: number) => {
    if (value >= 1000000) {
      return `$${value / 1000000}M`;
    }

    if (value >= 1000) {
      return `$${value / 1000}k`;
    }

    return `$${value}`;
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-primary-text">
          Ingresos vs. Gastos
        </h3>

        <p className="mt-1 text-xs text-secondary">
          Compara tus ingresos y gastos.
        </p>
      </div>

      <div className="mb-5 flex gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-success" />
            <span className="text-xs text-secondary">Ingresos</span>
          </div>

          <p className="mt-1 text-sm font-semibold text-primary-text">
            {formatCurrency(totalIncome)}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-danger" />
            <span className="text-xs text-secondary">Gastos</span>
          </div>

          <p className="mt-1 text-sm font-semibold text-primary-text">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="name"
              tick={{
                fontSize: 12,
                fill: "#64748b",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              width={65}
              tick={{
                fontSize: 12,
                fill: "#64748b",
              }}
              tickFormatter={formatAxisValue}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value, name) => [
                formatCurrency(Number(value)),
                name === "ingresos" ? "Ingresos" : "Gastos",
              ]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
              }}
            />

            <Bar
              dataKey="ingresos"
              fill="#16a34a"
              radius={[4, 4, 0, 0]}
              maxBarSize={45}
            />

            <Bar
              dataKey="gastos"
              fill="#dc2626"
              radius={[4, 4, 0, 0]}
              maxBarSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

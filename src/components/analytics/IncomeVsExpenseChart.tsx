import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";
import { ChartColumn } from "lucide-react";

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

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis
              width={70}
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `$${value / 1000000}M`;
                }

                return `$${value / 1000}k`;
              }}
            />

            <Tooltip formatter={(value) => formatCurrency(Number(value))} />

            <Bar dataKey="ingresos" fill="#16a34a" />

            <Bar dataKey="gastos" fill="#dc2626" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

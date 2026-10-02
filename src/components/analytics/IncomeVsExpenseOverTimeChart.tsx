import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartNoAxesCombined } from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/formatters";

interface IncomeVsExpenseOverTimeChartProps {
  data: {
    date: string;
    ingresos: number;
    gastos: number;
  }[];
}

export default function IncomeVsExpenseOverTimeChart({
  data,
}: IncomeVsExpenseOverTimeChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-primary-text">
            Evolución de ingresos y gastos
          </h3>

          <p className="mt-1 text-xs text-secondary">
            Compara tus ingresos y gastos a lo largo del tiempo.
          </p>
        </div>

        <div className="flex h-72 flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-surface-hover text-secondary">
            <ChartNoAxesCombined size={24} />
          </div>

          <h4 className="text-sm font-semibold text-primary-text">
            No hay movimientos registrados
          </h4>

          <p className="mt-1 max-w-xs text-sm text-secondary">
            Registra ingresos o gastos para comenzar a ver su evolución.
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
          Evolución de ingresos y gastos
        </h3>

        <p className="mt-1 text-xs text-secondary">
          Compara tus ingresos y gastos a lo largo del tiempo.
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
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{
                fontSize: 12,
                fill: "#64748b",
              }}
              tickMargin={8}
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
              labelFormatter={(label) => formatDate(String(label))}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
              }}
            />

            <Line
              type="monotone"
              dataKey="ingresos"
              stroke="#16a34a"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />

            <Line
              type="monotone"
              dataKey="gastos"
              stroke="#dc2626"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

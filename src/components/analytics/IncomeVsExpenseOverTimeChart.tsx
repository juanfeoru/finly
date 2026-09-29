import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IncomeVsExpenseOverTimeChartProps {
  data: {
    date: string;
    ingresos: number;
    gastos: number;
  }[];
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T00:00:00`));
};

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
            Observa cómo han cambiado tus movimientos.
          </p>
        </div>

        <div className="flex h-72 flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-surface-hover text-secondary">
            <span className="text-xl">?</span>
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

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-primary-text">
          Evolución de ingresos y gastos
        </h3>

        <p className="mt-1 text-xs text-secondary">
          Observa cómo han cambiado tus movimientos.
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 14 }}
              tickMargin={8}
            />

            <YAxis
              width={70}
              tick={{ fontSize: 14 }}
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `$${value / 1000000}M`;
                }

                return `$${value / 1000}k`;
              }}
            />

            <Tooltip
              formatter={(value) => `$${Number(value).toLocaleString("es-CO")}`}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="ingresos"
              stroke="#16a34a"
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="gastos"
              stroke="#dc2626"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

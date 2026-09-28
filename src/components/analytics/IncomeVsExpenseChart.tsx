import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

            <Tooltip
              formatter={(value) => `$${Number(value).toLocaleString("es-CO")}`}
            />

            <Bar dataKey="ingresos" fill="#16a34a" />

            <Bar dataKey="gastos" fill="#dc2626" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

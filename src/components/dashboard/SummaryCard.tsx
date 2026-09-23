import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number;
  type: "balance" | "income" | "expense";
}

export default function SummaryCard({ title, value, type }: SummaryCardProps) {
  const icons = {
    balance: Wallet,
    income: ArrowUpRight,
    expense: ArrowDownRight,
  };

  const Icon = icons[type];

  const iconStyles = {
    balance: "bg-primary/10 text-primary",
    income: "bg-success/10 text-success",
    expense: "bg-danger/10 text-danger",
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-secondary">{title}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-primary-text">
            ${value.toLocaleString("es-CO")}
          </p>
        </div>

        <div
          className={`flex size-10 items-center justify-center rounded-lg ${iconStyles[type]}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

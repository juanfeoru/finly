import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

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
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-secondary">{title}</p>

          <p className="mt-2 truncate text-xl font-bold tracking-tight text-primary-text sm:text-2xl">
            {formatCurrency(value)}
          </p>
        </div>

        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${iconStyles[type]}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

import type { Transaction } from "../types/transaction";

export function sortTransactionsByDate(transactions: Transaction[]) {
  return [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function isCurrentMonth(date: string, selectedMonth: string) {
  return date.slice(0, 7) === selectedMonth;
}

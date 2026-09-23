import type { Transaction } from "../types/transaction";

export function useFinancialSummary(transactions: Transaction[]) {
  const totalIncome = transactions.reduce((total, transaction) => {
    if (transaction.type === "income") {
      return total + transaction.value;
    }

    return total;
  }, 0);

  const totalExpense = transactions.reduce((total, transaction) => {
    if (transaction.type === "expense") {
      return total + transaction.value;
    }

    return total;
  }, 0);

  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance,
  };
}

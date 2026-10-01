import type { Budget } from "../types/budget";
import type { Transaction } from "../types/transaction";
import { isTransactionInMonth } from "./transactions";

export function getBudgetSpent(
  budget: Budget,
  transactions: Transaction[],
  selectedMonth: string,
) {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === "expense" &&
        transaction.category === budget.category &&
        isTransactionInMonth(transaction.date, selectedMonth),
    )
    .reduce((total, transaction) => total + transaction.value, 0);
}

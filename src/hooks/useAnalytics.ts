import type { Transaction } from "../types/transaction";

export function useAnalytics(transactions: Transaction[]) {
  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const incomes = transactions.filter(
    (transaction) => transaction.type === "income",
  );

  const totalExpenses = expenses.reduce(
    (total, transaction) => total + transaction.value,
    0,
  );

  const totalIncome = incomes.reduce(
    (total, transaction) => total + transaction.value,
    0,
  );

  const expensesByCategory = expenses.reduce<
    { category: string; total: number }[]
  >((result, transaction) => {
    const existingCategory = result.find(
      (item) => item.category === transaction.category,
    );

    if (existingCategory) {
      existingCategory.total += transaction.value;
    } else {
      result.push({
        category: transaction.category,
        total: transaction.value,
      });
    }

    return result;
  }, []);

  const incomeVsExpense = [
    {
      name: "Finanzas",
      ingresos: totalIncome,
      gastos: totalExpenses,
    },
  ];

  return {
    totalExpenses,
    totalIncome,
    expensesByCategory,
    incomeVsExpense,
  };
}

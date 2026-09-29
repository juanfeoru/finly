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

  const incomeVsExpenseOverTime = transactions.reduce<
    {
      date: string;
      ingresos: number;
      gastos: number;
    }[]
  >((result, transaction) => {
    const existingDate = result.find((item) => item.date === transaction.date);

    if (existingDate) {
      if (transaction.type === "income") {
        existingDate.ingresos += transaction.value;
      } else {
        existingDate.gastos += transaction.value;
      }
    } else {
      result.push({
        date: transaction.date,
        ingresos: transaction.type === "income" ? transaction.value : 0,
        gastos: transaction.type === "expense" ? transaction.value : 0,
      });
    }

    return result;
  }, []);

  return {
    totalExpenses,
    totalIncome,
    expensesByCategory,
    incomeVsExpense,
    incomeVsExpenseOverTime,
  };
}

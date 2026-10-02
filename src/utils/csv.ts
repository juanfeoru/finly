import { CATEGORY_NAMES } from "../constants/categories";
import type { Transaction } from "../types/transaction";

export function exportTransactionsToCSV(transactions: Transaction[]) {
  const headers = ["ID", "Descripción", "Monto", "Tipo", "Categoría", "Fecha"];

  const rows = transactions.map((transaction) => {
    return [
      transaction.id,
      transaction.description,
      transaction.value,
      transaction.type === "income" ? "Ingreso" : "Gasto",
      CATEGORY_NAMES[transaction.category],
      transaction.date,
    ];
  });

  const csvRows = rows.map((row) =>
    row.map((value) => escapeCSVValue(value)).join(","),
  );
  const csvContent = [headers.join(","), ...csvRows].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "finly-transactions.csv";

  link.click();

  URL.revokeObjectURL(url);
}

function escapeCSVValue(value: string | number) {
  const stringValue = String(value);

  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

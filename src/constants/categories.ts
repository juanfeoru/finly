import type { TransactionCategory } from "../types/transaction";

export const EXPENSE_CATEGORIES: TransactionCategory[] = [
  "food",
  "transportation",
  "entertainment",
  "health",
  "education",
  "housing",
  "shopping",
  "subscriptions",
  "other",
];

export const CATEGORY_NAMES: Record<string, string> = {
  food: "Alimentación",
  transportation: "Transporte",
  entertainment: "Entretenimiento",
  health: "Salud",
  education: "Educación",
  housing: "Vivienda",
  shopping: "Compras",
  subscriptions: "Suscripciones",
  salary: "Salario",
  freelance: "Freelance",
  investment: "Inversiones",
  other: "Otros",
};

export const CATEGORY_COLORS: Record<string, string> = {
  food: "#f59e0b",
  transportation: "#3b82f6",
  entertainment: "#8b5cf6",
  health: "#ef4444",
  education: "#06b6d4",
  housing: "#64748b",
  shopping: "#ec4899",
  subscriptions: "#14b8a6",
  investment: "#22c55e",
  freelance: "#a855f7",
  salary: "#10b981",
  other: "#94a3b8",
};

export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
}

export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "food"
  | "transportation"
  | "entertainment"
  | "health"
  | "education"
  | "housing"
  | "shopping"
  | "subscriptions"
  | "salary"
  | "freelance"
  | "investment"
  | "other";

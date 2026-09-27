import type { TransactionCategory } from "./transaction";

export interface Budget {
  id: number;
  category: TransactionCategory;
  limit: number;
}

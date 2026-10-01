import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import type { Transaction } from "../types/transaction";
import type { Budget } from "../types/budget";
import AddTransactionForm from "../components/transactions/AddTransactionForm";

interface AppLayoutProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  budgets: Budget[];
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
}

export default function AppLayout({
  transactions,
  setTransactions,
  budgets,
  setBudgets,
}: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);

  function handleOpenTransactionForm(transaction?: Transaction) {
    setTransactionToEdit(transaction ?? null);
    setIsAddingTransaction(true);
  }

  function handleCloseTransactionForm() {
    setIsAddingTransaction(false);
    setTransactionToEdit(null);
  }

  function handleAddTransaction(transaction: Transaction) {
    setTransactions((prev) => {
      if (transactionToEdit) {
        return prev.map((item) =>
          item.id === transaction.id ? transaction : item,
        );
      }

      return [...prev, transaction];
    });

    handleCloseTransactionForm();
  }

  useEffect(() => {
    if (isAddingTransaction) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isAddingTransaction]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet
            context={{
              transactions,
              setTransactions,
              budgets,
              setBudgets,
              openTransactionForm: handleOpenTransactionForm,
            }}
          />
        </main>
      </div>

      {isAddingTransaction && (
        <AddTransactionForm
          onCancel={handleCloseTransactionForm}
          onAddTransaction={handleAddTransaction}
          transactionToEdit={transactionToEdit ?? undefined}
        />
      )}
    </div>
  );
}

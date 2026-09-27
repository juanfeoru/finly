import { useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import type { Transaction } from "../types/transaction";
import type { Budget } from "../types/budget";

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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet
            context={{ transactions, setTransactions, budgets, setBudgets }}
          />
        </main>
      </div>
    </div>
  );
}

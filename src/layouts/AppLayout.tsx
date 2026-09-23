import { Outlet } from "react-router";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import type { Transaction } from "../types/transaction";

interface AppLayoutProps {
  transactions: Transaction[];
}

export default function AppLayout({ transactions }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet context={{ transactions }} />
        </main>
      </div>
    </div>
  );
}

import AppLayout from "./layouts/AppLayout";
import type { Transaction } from "./types/transaction";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Budgets from "./pages/Budgets";
import type { Budget } from "./types/budget";
import Analytics from "./pages/Analytics";

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "finly-transactions",
    [],
  );

  const [budgets, setBudgets] = useLocalStorage<Budget[]>("finly-budgets", []);

  return (
    <Routes>
      <Route
        element={
          <AppLayout
            transactions={transactions}
            setTransactions={setTransactions}
            budgets={budgets}
            setBudgets={setBudgets}
          />
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}

export default App;

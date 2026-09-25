import AppLayout from "./layouts/AppLayout";
import type { Transaction } from "./types/transaction";
import { transactions as initialTransactions } from "./data/transactions";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "finly-transactions",
    initialTransactions,
  );

  return (
    <Routes>
      <Route
        element={
          <AppLayout
            transactions={transactions}
            setTransactions={setTransactions}
          />
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>
    </Routes>
  );
}

export default App;

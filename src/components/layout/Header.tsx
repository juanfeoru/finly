import { useLocation } from "react-router";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/transactions": "Transacciones",
  "/budgets": "Presupuestos",
  "/analytics": "Analíticas",
};

export default function Header() {
  const { pathname } = useLocation();

  const pageTitle = PAGE_TITLES[pathname] ?? "Finly";

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-6">
      <div>
        <h1 className="text-lg font-semibold text-primary-text">{pageTitle}</h1>
      </div>
    </header>
  );
}

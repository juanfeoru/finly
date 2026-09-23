import { Menu } from "lucide-react";
import { useLocation } from "react-router";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/transactions": "Transacciones",
  "/budgets": "Presupuestos",
  "/analytics": "Analíticas",
};

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { pathname } = useLocation();

  const pageTitle = PAGE_TITLES[pathname] ?? "Finly";

  return (
    <header className="flex h-16 items-center border-b border-border bg-surface px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="mr-4 rounded-lg p-2 text-secondary hover:bg-surface-hover hover:text-primary-text md:hidden cursor-pointer"
        aria-label="Abrir menú"
      >
        <Menu size={20} />
      </button>

      <h1 className="text-lg font-semibold text-primary-text">{pageTitle}</h1>
    </header>
  );
}

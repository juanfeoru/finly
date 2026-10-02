import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-border px-5 py-3">
      <p className="text-sm text-secondary">
        Página {currentPage} de {totalPages}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex size-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-surface-hover hover:text-primary-text disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex size-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-surface-hover hover:text-primary-text disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          aria-label="Página siguiente"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export function formatCurrency(value: number) {
  return `$${value.toLocaleString("es-CO")}`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T00:00:00`));
}

export const FormatCurrency = (value: number | null) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0).replace(/\s/g, "");
export const FormatDate = (value: Date) => {
  return new Date(value).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", // ! Z at the end
  });
};

export const ConvertDateLocalIntoDate = (dateLocal: Date):string => {
  const converted = [
    dateLocal.getFullYear(),
    String(dateLocal.getMonth() + 1).padStart(2, "0"),
    String(dateLocal.getDate()).padStart(2, "0"),
  ].join("-");

  return converted;
};

export const ConvDateIntl = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date)); // ? sabtu, 04 january 2026
}
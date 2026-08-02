"use client";

interface IDateInput {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

export const FormattedDate = (date: string) => {
  return date
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Pilih Tanggal";
};

const DateInput = ({ date, setDate }: IDateInput) => {
  const formatDate = FormattedDate(date);

  return (
    <div className="relative py-4">
      <label
        htmlFor="transaction-date"
        className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-400"
      >
        Tanggal
      </label>

      <div className=" relative w-full flex items-center border-b border-zinc-300 pb-1">
        <span
          className="mr-2 text-sm text-white w-[90%]"
          data-testid="formatted-date"
        >
          {formatDate}
        </span>

        <input
          id="transaction-date"
          aria-label="Transaction Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="
      relative
      flex-1
      cursor-pointer
      text-transparent

      [&::-webkit-datetime-edit]:hidden
      [&::-webkit-calendar-picker-indicator]:m-0
      [&::-webkit-calendar-picker-indicator]:cursor-pointer
      [&::-webkit-calendar-picker-indicator]:invert
    "
        />
      </div>
    </div>
  );
};

export default DateInput;

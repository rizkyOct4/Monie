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

  // return (
  //   <div className="flex w-full items-center rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
  //     <span
  //       className="flex-1 truncate text-sm font-medium text-zinc-900"
  //       data-testid="formatted-date"
  //     >
  //       {formatDate}
  //     </span>

  //     <input
  //       id="transaction-date"
  //       aria-label="Transaction Date"
  //       type="date"
  //       value={date}
  //       onChange={(e) => setDate(e.target.value)}
  //       className="
  //     w-8
  //     cursor-pointer
  //     text-transparent
  //     outline-none

  //     [&::-webkit-datetime-edit]:hidden
  //     [&::-webkit-calendar-picker-indicator]:m-0
  //     [&::-webkit-calendar-picker-indicator]:h-6
  //     [&::-webkit-calendar-picker-indicator]:w-6
  //     [&::-webkit-calendar-picker-indicator]:cursor-pointer
  //     [&::-webkit-calendar-picker-indicator]:opacity-70
  //     hover:[&::-webkit-calendar-picker-indicator]:opacity-100
  //   "
  //     />
  //   </div>
  // );
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-zinc-200">{formatDate}</span>

      <input
        id="transaction-date"
        aria-label="Transaction Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="
        h-8
        w-8
        cursor-pointer
        rounded-lg
        border
        border-zinc-800
        bg-zinc-900
        p-1
        text-transparent
        outline-none
        transition
        hover:border-emerald-500/40
        hover:bg-zinc-800
        focus:border-emerald-500/50
        focus:ring-2
        focus:ring-emerald-500/10

        [&::-webkit-datetime-edit]:hidden
        [&::-webkit-calendar-picker-indicator]:m-0
        [&::-webkit-calendar-picker-indicator]:h-5
        [&::-webkit-calendar-picker-indicator]:w-5
        [&::-webkit-calendar-picker-indicator]:cursor-pointer
        [&::-webkit-calendar-picker-indicator]:opacity-70
        hover:[&::-webkit-calendar-picker-indicator]:opacity-100
      "
      />
    </div>
  );
};

export default DateInput;

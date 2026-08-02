import { render, screen, fireEvent } from "@testing-library/react";
import DateInput from "@/app/(pages)/transaction/components/header";
import { MockUseQueryTransactions } from "@/app/__mocks__/(pages)/transaction/transaction.mock";
import { FormattedDate } from "@/app/(pages)/transaction/components/header";

const { date, setDate } = MockUseQueryTransactions();

const mockProps = {
  date: date,
  setDate: setDate,
};

describe("Render date input", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<DateInput {...mockProps} />);
  });

  it("check !!date function formate date", () => {
    expect(FormattedDate("")).toBe("Pilih Tanggal");
  });

  it("users action change date", () => {
    // ? FIND EVENT
    const input = screen.getByLabelText("Transaction Date");;

    // ? CHANGE EVENT
    fireEvent.change(input, {
      target: {
        value: "2026-07-26",
      },
    });

    // screen.debug(mockProps.date);
    // console.log(mockProps.date)

    expect(mockProps.setDate).toHaveBeenCalledWith("2026-07-26");
  });

  it("Format new Date", () => {
    const formattedDate = screen.getByTestId("formatted-date");
    const checkValue = FormattedDate(mockProps.date);

    expect(formattedDate).toHaveTextContent(checkValue);
  });
});
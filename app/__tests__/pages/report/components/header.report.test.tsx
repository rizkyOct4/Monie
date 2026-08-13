import { render, screen, fireEvent } from "@testing-library/react";
import HeaderReport from "@/app/(pages)/report/components/header";
import { ReportContext } from "@/app/context/context";

const mockContext = {
  setPeriod: jest.fn(),
  setIdPeriod: jest.fn(),
  isFetchingPeriodTransaction: true,
  PeriodTransactionData: [
    {
      id: "1",
      initialName: "Asking",
    },
  ],
};

const renderHeader = (context = mockContext) =>
  render(
    <ReportContext.Provider value={context}>
      <HeaderReport />
    </ReportContext.Provider>,
  );

describe("HeaderReport", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should call setPeriod when month changes", () => {
    renderHeader();

    // ? FIND EVENT
    const input = screen.getByTestId("period-input");

    // ? CHANGE EVENT
    fireEvent.change(input, {
      target: {
        value: "2026-07",
      },
    });

    expect(mockContext.setPeriod).toHaveBeenCalledWith("2026-07");
  });

  it("should open transaction dropdown", () => {
    renderHeader();

    // ? BEFORE OPEN TRANSACTION
    expect(screen.queryByText("Asking")).not.toBeInTheDocument();

    const button = screen.getByTestId("transaction-button");

    // ? OPEN BUTTON
    fireEvent.click(button);

    const loading = screen.getByTestId("loading-transaction");

    expect(loading).toBeInTheDocument();
  });

  it("should close transaction dropdown and selected id transaction", () => {
    const { rerender } = renderHeader();

    // ! why do i have to open that state first ? =====
    // ? OPEN
    const openButton = screen.getByTestId("transaction-button");
    fireEvent.click(openButton);

    const parent = screen.getByTestId("transaction-dropdown");
    expect(parent).toBeInTheDocument();

    expect(screen.getByTestId("loading-transaction")).toBeInTheDocument();

    // ! UPDATE CONTEXT MOCK ====
    const updateContext = {
      ...mockContext,
      isFetchingPeriodTransaction: false,
    };

    rerender(
      <ReportContext.Provider value={updateContext}>
        <HeaderReport />
      </ReportContext.Provider>,
    );

    expect(screen.queryByTestId("loading-transaction")).not.toBeInTheDocument();

    const button = screen.getByTestId("transaction-item-1");

    fireEvent.click(button);

    expect(mockContext.setIdPeriod).toHaveBeenCalledWith("1");

    expect(screen.queryByTestId("transaction-dropdown")).not.toBeInTheDocument();

    expect(openButton).toHaveTextContent("Asking");
  });
});

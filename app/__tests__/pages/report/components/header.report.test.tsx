import { render, screen, fireEvent } from "@testing-library/react";
import HeaderReport from "@/app/(pages)/report/components/header";
import { ReportContext } from "@/app/context/context";

const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: jest.fn(),
  }),

  useSearchParams: () => ({
    get: jest.fn((key: string) => {
      const params: Record<string, string> = {
        id: "PA5joHul",
        v: "total-transaction",
      };

      return params[key] ?? null;
    }),
  }),
}));

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
  it("should call setPeriod when month changes and automatically open ID Transaction after", () => {
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

    const dropdownIDTransaction = screen.getByRole("dialog", {
      name: "Transaction ID Dropdown",
    });

    expect(dropdownIDTransaction).toBeInTheDocument();
  });

  it("should close transaction dropdown and selected id transaction", () => {
    const { rerender } = renderHeader();

    // ! why do i have to open that state first ? =====
    // ? OPEN
    const openButton = screen.getByRole("button", {
      name: "ID Transaction Button"
    });
    fireEvent.click(openButton);

    const dropdownIDTransaction = screen.getByRole("dialog", {
      name: "Transaction ID Dropdown",
    });
    expect(dropdownIDTransaction).toBeInTheDocument();

    expect(
      screen.getByRole("status", {
        name: "Loading ID Transaction",
      }),
    ).toBeInTheDocument();

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
    expect(
      screen.queryByRole("status", {
        name: "Loading ID Transaction",
      }),
    ).not.toBeInTheDocument();

    const selectedID = screen.getByRole("button", {
      name: "ID Transaction Items 1"
    });

    fireEvent.click(selectedID);

    expect(mockContext.setIdPeriod).toHaveBeenCalledWith("1");

    expect(
      screen.queryByRole("dialog", {
        name: "Transaction ID Dropdown"
      }),
    ).not.toBeInTheDocument();

    expect(openButton).toHaveTextContent("Asking");
  });
});

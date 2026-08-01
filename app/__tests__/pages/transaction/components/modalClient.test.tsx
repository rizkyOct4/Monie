import { render, screen } from "@testing-library/react";
import TransactionModalClient from "@/app/(pages)/transaction/transcation-modal-client";
import { TransactionContext } from "@/app/context/context";
import { MockTransactionsListData } from "@/app/__tests__/mocks/(pages)/transaction/transaction.mock";

const mockProps = jest.fn();
jest.mock("@/app/(pages)/transaction/components/header", () => ({
  __esModule: true,
  default: (props: { date: Date; setDate: () => void }) => {
    mockProps(props);

    return <div data-testid="date-input" />;
  },
}));

// * TRANSACTIONS LIST DATA ========
jest.mock("@/app/(pages)/transaction/skeleton/skeleton-transactions", () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton-transaction-list" />,
}));

const mockPropsTransactionList = jest.fn();
jest.mock("@/app/(pages)/transaction/components/transactions-list", () => ({
  __esModule: true,
  default: (
    TransactionsListData: typeof MockTransactionsListData,
    setIdTransaction: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    mockPropsTransactionList(TransactionsListData);

    return <div data-testid="transaction-list" />;
  },
}));

const mockContext = {
  date: "2026-7-25",
  setDate: jest.fn(),
  TransactionsListData: MockTransactionsListData,
  setIdTransaction: jest.fn(),
  isFTransactionsListData: true,
};

const renderTransactions = (context = mockContext) =>
  render(
    <TransactionContext.Provider value={context}>
      <TransactionModalClient />
    </TransactionContext.Provider>,
  );

describe("Should render transaction modal client", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("check params DateInput", () => {
    renderTransactions();

    expect(mockProps).toHaveBeenCalledWith(
      expect.objectContaining({
        date: mockContext.date,
        setDate: mockContext.setDate,
      }),
    );
  });

  describe("Render Transaction Section", () => {
    it("show skeleton and then -> transaction list data", () => {
      const { rerender } = renderTransactions();

      expect(
        screen.getByTestId("skeleton-transaction-list"),
      ).toBeInTheDocument();

      // ! UPDATE CONTEXT MOCK ====
      const updateContext = {
        ...mockContext,
        isFTransactionsListData: false,
      };

      rerender(
        <TransactionContext.Provider value={updateContext}>
          <TransactionModalClient />
        </TransactionContext.Provider>,
      );

      expect(
        screen.queryByTestId("skeleton-transaction-list"),
      ).not.toBeInTheDocument();

      // ? CALL FUNCTION
      expect(mockPropsTransactionList).toHaveBeenCalledWith(
        expect.objectContaining({
          TransactionsListData: mockContext.TransactionsListData,
          setIdTransaction: mockContext.setIdTransaction,
        }),
      );
    });
  });
});

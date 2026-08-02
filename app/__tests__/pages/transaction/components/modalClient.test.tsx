import { render, screen } from "@testing-library/react";
import TransactionModalClient from "@/app/(pages)/transaction/transcation-modal-client";
import { TransactionContext } from "@/app/context/context";
import { MockTransactionsListData } from "@/app/__mocks__/(pages)/transaction/transaction.mock";
import { MockUseQueryTransactions } from "@/app/__mocks__/(pages)/transaction/transaction.mock";

const { date, setDate, TransactionsListData, isFTransactionsListData } =
  MockUseQueryTransactions();

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
  default: () => <div role="status" aria-label="Skeleton Transactions" />,
}));

const mockPropsTransactionList = jest.fn();
jest.mock("@/app/(pages)/transaction/components/transactions-list", () => ({
  __esModule: true,
  default: (props: {
    TransactionsListData: typeof MockTransactionsListData;
    setIdTransaction: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    mockPropsTransactionList(props);

    return <div role="dialog" aria-label="Transactions List" />;
  },
}));

const mockContext = {
  date: date,
  setDate: setDate,
  TransactionsListData: TransactionsListData,
  setIdTransaction: jest.fn(),
  isFTransactionsListData: isFTransactionsListData,
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

  it("show skeleton and then -> transaction list data", () => {
    const { rerender } = renderTransactions();

    expect(
      screen.getByRole("status", {
        name: "Skeleton Transactions",
      }),
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
      screen.queryByRole("status", {
        name: "Skeleton Transactions",
      }),
    ).not.toBeInTheDocument();

    // ? CALL FUNCTION
    expect(mockPropsTransactionList).toHaveBeenCalledWith(
      expect.objectContaining({
        TransactionsListData: mockContext.TransactionsListData,
        setIdTransaction: mockContext.setIdTransaction,
      }),
    );

    expect(
      screen.getByRole("dialog", {
        name: "Transactions List",
      }),
    ).toBeInTheDocument();
  });
});

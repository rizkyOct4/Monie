import { render, screen } from "@testing-library/react";
import ReportClient from "@/app/(pages)/report/components";
import { ReportContext } from "@/app/context/context";
import { MockUseQueryIdPeriodTransactions } from "@/app/__mocks__/(pages)/report/hook/hook.index.mock";

const { IdPeriodTransactionData, idPeriod, isFetchingIdPeriodTransaction } =
  MockUseQueryIdPeriodTransactions();

const mockReportInsight = jest.fn();
const mockReportFinanceHealth = jest.fn();

jest.mock("@/app/(pages)/report/components/header", () => ({
  __esModule: true,
  default: () => <div data-testid="header-report" />,
}));

jest.mock("@/app/(pages)/report/components/finance-health", () => ({
  __esModule: true,
  default: ({
    salaryIncome,
    salaryRemaining,
    isFetchingIdPeriodTransaction,
  }: {
    salaryIncome: number;
    salaryRemaining: number;
    isFetchingIdPeriodTransaction: boolean;
  }) => {
    mockReportFinanceHealth({
      salaryIncome,
      salaryRemaining,
      isFetchingIdPeriodTransaction,
    });

    return <div data-testid="finance-health-report" />;
  },
}));

jest.mock("@/app/(pages)/report/components/insight", () => ({
  __esModule: true,
  default: ({
    insightData,
    isFetchingIdPeriodTransaction,
  }: {
    insightData: {
      totalTransaction: number;
      biggestExpense: {
        date: Date;
        amount: number;
      } | null;
      averageExpense: number;
      amountNominal: number;
      mostExpensiveDay: {
        date: Date;
        amount: number;
      } | null;
    };
    isFetchingIdPeriodTransaction: boolean;
  }) => {
    mockReportInsight({ insightData, isFetchingIdPeriodTransaction });

    return <div data-testid="insight-report" />;
  },
}));

const mockContext = {
  IdPeriodTransactionData: IdPeriodTransactionData,
  idPeriod: idPeriod,
  isFetchingIdPeriodTransaction: isFetchingIdPeriodTransaction,
};

const RenderReportClient = (context = mockContext) => {
  return render(
    <ReportContext.Provider value={context}>
      <ReportClient />
    </ReportContext.Provider>,
  );
};

describe("Render ReportClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    RenderReportClient();
  });

  it("should render all child components", () => {
    expect(screen.getByTestId("header-report")).toBeInTheDocument(); // ! CHECK IF data-testId -> exists
    expect(screen.getByTestId("finance-health-report")).toBeInTheDocument();
    expect(screen.getByTestId("insight-report")).toBeInTheDocument();
  });
  it("should send correct props to FinanceHealth", () => {
    expect(mockReportFinanceHealth).toHaveBeenCalledWith({
      salaryIncome: IdPeriodTransactionData[0].salaryIncome,
      salaryRemaining: IdPeriodTransactionData[0].salaryRemaining,
      isFetchingIdPeriodTransaction: false,
    });
  });

  it("should send correct props to ReportInsight", () => {
    expect(mockReportInsight).toHaveBeenCalledWith({
      insightData: mockContext.IdPeriodTransactionData[0].insight[0],
      isFetchingIdPeriodTransaction: false,
    });
  });
});

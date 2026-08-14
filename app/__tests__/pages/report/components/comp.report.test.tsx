import { render, screen } from "@testing-library/react";
import ReportClient from "@/app/(pages)/report/components";
import { ReportContext } from "@/app/context/context";
import { MockUseQueryIdPeriodTransactions } from "@/app/__mocks__/(pages)/report/hook/hook.index.mock";

const { IdPeriodTransactionData, idPeriod } =
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
  }: {
    salaryIncome: number;
    salaryRemaining: number;
  }) => {
    mockReportFinanceHealth({ salaryIncome, salaryRemaining });

    return <div data-testid="finance-health-report" />;
  },
}));

jest.mock("@/app/(pages)/report/components/insight", () => ({
  __esModule: true,
  default: (
    insightData: {
      totalTransaction: number;
      biggestExpense: {
        date: Date;
        amount: number;
      };
      averageExpense: number;
      amountNominal: number;
      mostExpensiveDay: {
        date: Date;
        amount: number;
      };
    }[],
  ) => {
    mockReportInsight(insightData);

    return <div data-testid="insight-report" />;
  },
}));

const mockContext = {
  IdPeriodTransactionData: IdPeriodTransactionData,
  idPeriod: idPeriod,
};

describe("Render ReportClient", () => {
  beforeEach(() => {
    mockReportInsight.mockClear();
  });

  it("should render all child components", () => {
    render(
      <ReportContext.Provider value={mockContext}>
        <ReportClient />
      </ReportContext.Provider>,
    );

    expect(screen.getByTestId("header-report")).toBeInTheDocument(); // ! CHECK IF data-testId -> exists
    expect(screen.getByTestId("finance-health-report")).toBeInTheDocument();
    expect(screen.getByTestId("insight-report")).toBeInTheDocument();
  });
});

// /**
//  * @jest-environment node
//  */

import { render, screen } from "@testing-library/react";
import ReportClient from "@/app/(pages)/report/components";
import { ReportContext } from "@/app/context/context";

// ? TUGAS DARI INI CUMA MEMBUAT COMPONENT MOCK PALSU -> GA MERENDER KESELURUHAN ISI DARI COMPONENT -> CUMA MEMASTIKAN APAKAH COMPONENT DI RENDER ATAU TIDAK
const mockReportInsight = jest.fn();

jest.mock("@/app/(pages)/report/components/header", () => ({
  __esModule: true,
  default: () => <div data-testid="header-report" />,
}));

jest.mock("@/app/(pages)/report/components/finance-health", () => ({
  __esModule: true,
  default: () => <div data-testid="finance-health-report" />,
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
  IdPeriodTransactionData: [
    {
      salaryIncome: 2000000,
      salaryRemaining: 1800000,
      createdAt: new Date("2026-07-19T10:00:00.000Z"),
      updatedAt: new Date("2026-07-19T12:00:00.000Z"),
      status: "ACTIVE",
      insight: [
        {
          totalTransaction: 10,
          biggestExpense: {
            date: new Date("2026-07-19T10:00:00.000Z"),
            amount: 500000,
          },
          averageExpense: 150000,
          amountNominal: 1500000,
          mostExpensiveDay: {
            date: new Date("2026-07-19T10:00:00.000Z"),
            amount: 800000,
          },
        },
      ],
    },
  ],
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
  it("should pass undefined when context is empty", () => {
    render(
      <ReportContext.Provider
        value={{
          IdPeriodTransactionData: [],
        }}
      >
        <ReportClient />
      </ReportContext.Provider>,
    );

    expect(mockReportInsight.mock.calls[0][0].insightData).toBeUndefined();
  });
});

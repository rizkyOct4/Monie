import { render, screen } from "@testing-library/react";
import ReportInsight from "@/app/(pages)/report/components/insight";
import type { ReportInsightProps } from "@/app/(pages)/report/components/insight";
import { FormatCurrency } from "@/_utils/format-currency";

const mockProps: ReportInsightProps = {
  insightData: [
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
};

const renderInsight = (props = mockProps) =>
  render(<ReportInsight {...props} />);

describe("Insight Report", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render Insight Report", () => {
    renderInsight();

    const title = screen.getByTestId("insight-report-section");
    const totalTransaction = screen.getByTestId(
      "insight-report-total-transaction",
    );
    const biggestExpense = screen.getByTestId("insight-report-biggest-expense");
    const averageExpense = screen.getByTestId("insight-report-average-expense");
    const mostExpensiveDay = screen.getByTestId(
      "insight-report-most-expensive-day",
    );

    expect(biggestExpense).toHaveTextContent(
      FormatCurrency(mockProps.insightData[0].biggestExpense.amount),
    );
    expect(totalTransaction).toHaveTextContent("10");

    expect(averageExpense).toHaveTextContent(
      FormatCurrency(mockProps.insightData[0].averageExpense),
    );

    expect(mostExpensiveDay).toHaveTextContent("800000");

    expect(title).toBeInTheDocument();
  });

  it("should not render insight items when insightData is empty", () => {
    render(<ReportInsight insightData={[]} />);

    expect(
      screen.queryByTestId("insight-report-total-transaction"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByTestId("insight-report-biggest-expense"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByTestId("insight-report-average-expense"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByTestId("insight-report-most-expensive-day"),
    ).not.toBeInTheDocument();
  });
});

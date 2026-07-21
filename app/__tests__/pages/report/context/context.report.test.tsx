import { useHookReport } from "@/app/(pages)/report/hook/hook-index";
import { render, screen } from "@testing-library/react";
import ReportProvider from "@/app/(pages)/report/context/context";

jest.mock("@/app/(pages)/report/hook/hook-index", () => ({
  useHookReport: jest.fn(),
}));

const mockedUseHookReport = useHookReport as jest.MockedFunction<
  typeof useHookReport
>;

describe("Context Report Page", () => {
  it("send values into children", () => {
    mockedUseHookReport.mockReturnValue({} as any);

    render(
      <ReportProvider>
        <div data-testid="child">Hello</div>
      </ReportProvider>,
    );

    expect(mockedUseHookReport).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});

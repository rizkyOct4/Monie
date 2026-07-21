import { render, screen } from "@testing-library/react";
import ReportPage, { metadata } from "@/app/(pages)/report/page";

jest.mock("@/app/(pages)/report/components", () => ({
  __esModule: true,
  default: () => <div data-testid="report-client" />,
}));

describe("ReportPage", () => {
  it("should render ReportClient", () => {
    render(<ReportPage />);

    expect(screen.getByTestId("report-client")).toBeInTheDocument();
  });

  it("should have correct metadata", () => {
    expect(metadata.title).toBe("Laporan | My App");
    expect(metadata.description).toBe("Halaman laporan keuangan pengguna.");
  });
});

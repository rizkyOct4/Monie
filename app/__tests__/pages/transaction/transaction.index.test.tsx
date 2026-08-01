import { render, screen } from "@testing-library/react";
import TransactionPage, { metadata } from "@/app/(pages)/transaction/page";

jest.mock("@/app/(pages)/transaction/transcation-modal-client", () => ({
  __esModule: true,
  default: () => <div data-testid="transaction-modal-client" />,
}));

describe("should render transaction page", () => {
  it("should render transaction modal client", () => {
    render(<TransactionPage />);

    expect(screen.getByTestId("transaction-modal-client")).toBeInTheDocument();
  });

  it("should have correct metadata", () => {
    expect(metadata.title).toBe("Transaksi | My App");
    expect(metadata.description).toBe("Halaman transaksi user.");
  });
});

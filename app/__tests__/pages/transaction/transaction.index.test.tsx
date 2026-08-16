import { render, screen } from "@testing-library/react";
import TransactionPage, { metadata } from "@/app/(pages)/transaction/page";

jest.mock("@/app/(pages)/transaction/transcation-modal-client", () => ({
  __esModule: true,
  default: () => <div role="dialog" aria-label="Transaction Modal Client" />,
}));

describe("should render transaction page", () => {
  it("should render transaction modal client", () => {
    render(<TransactionPage />);

    expect(
      screen.getByRole("dialog", {
        name: "Transaction Modal Client",
      }),
    ).toBeInTheDocument();
  });

  it("should have correct metadata", () => {
    expect(metadata.title).toBe("Transaksi");
    expect(metadata.description).toBe("Halaman transaksi user.");
  });
});

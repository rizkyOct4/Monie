import { render, screen, fireEvent } from "@testing-library/react";
import TransactionList from "@/app/(pages)/transaction/components/transactions-list";

// ? MOCK IMPORT
import {
  MockTransactionsListData,
  MockPutFormTransactionsData,
  MockDeleteFormTransactionsData,
} from "@/app/__mocks__/(pages)/transaction/transaction.mock";

const mockProps = {
  TransactionsListData: MockTransactionsListData,
  setIdTransaction: jest.fn(),
};

// * MOCK COMPONENTS ===============
// ? POP UP IMAGES
const mockPropsPopUpShowImage = jest.fn();
type ImagesType = (typeof MockTransactionsListData)[number]["images"]; // ! number berarti "salah satu elemen array", sehingga hasilnya adalah tipe dari images.
jest.mock(
  "@/app/(pages)/transaction/components/pop-up/pop-up-show-image",
  () => ({
    __esModule: true,
    default: ({
      images,
      onClose,
    }: {
      images: ImagesType;
      onClose: () => void;
    }) => {
      mockPropsPopUpShowImage({ images, onClose });

      return (
        <div role="dialog" aria-label="Mock Popup Show Image">
          <button onClick={onClose}>Close</button>
        </div>
      );
    },
  }),
);

// ? POP UP UPDATE
const mockPropsPutImage = jest.fn();
jest.mock(
  "@/app/(pages)/transaction/components/pop-up/pop-up-form-put",
  () => ({
    __esModule: true,
    default: ({
      putValue,
      onClose,
    }: {
      putValue: typeof MockPutFormTransactionsData;
      onClose: () => void;
    }) => {
      mockPropsPutImage({ putValue, onClose });

      return (
        <div role="dialog" aria-label="Mock Popup Put Image">
          <button onClick={onClose}>Close</button>
        </div>
      );
    },
  }),
);

// ? POP UP DELETE
const mockPropsDeleteImage = jest.fn();
jest.mock("@/app/(pages)/transaction/components/pop-up/pop-up-delete", () => ({
  __esModule: true,
  default: ({
    deleteValue,
    onClose,
  }: {
    deleteValue: typeof MockDeleteFormTransactionsData;
    onClose: () => void;
  }) => {
    mockPropsDeleteImage({ deleteValue, onClose });

    return (
      <div role="dialog" aria-label="Mock Popup Delete Image">
        <button onClick={onClose}>Close</button>
      </div>
    );
  },
}));

const renderTransactionsList = (props = mockProps) =>
  render(<TransactionList {...props} />);

describe("Render Transaction List", () => {
  describe("Render Transaction Section", () => {
    it("check title", () => {
      renderTransactionsList();

      // const title = screen.getByTestId("title");
      const title = screen.getByRole("heading", {
        name: "Title",
      });
      expect(title).toHaveTextContent("Riwayat Transaksi");
    });
    it("check has information", () => {
      renderTransactionsList();

      const information = screen.getByRole("heading", {
        name: "Information Transaction",
      });
      expect(information).toBeInTheDocument();
    });
    it("check no information", () => {
      renderTransactionsList({
        ...mockProps,
        TransactionsListData: mockProps.TransactionsListData.map((i) => ({
          ...i,
          information: "",
        })),
      });

      const information = screen.getByRole("heading", {
        name: "Information Transaction",
      });
      expect(information).toHaveTextContent("Transaction");
    });
    it("check nominal more than > 50.000", () => {
      renderTransactionsList({
        ...mockProps,
        TransactionsListData: mockProps.TransactionsListData.map((i) => ({
          ...i,
          nominal: 51000,
        })),
      });

      const nominal = screen.getByTestId("nominal-transaction");
      expect(nominal).toHaveTextContent("(Hemat Oy !!)");
      expect(nominal).toHaveClass("text-red-400");
    });
    it("check nominal less than <= 50.000", () => {
      renderTransactionsList();

      const nominal = screen.getByTestId("nominal-transaction");
      expect(nominal).toHaveTextContent("-");
      expect(nominal).toHaveClass("text-emerald-400");
    });
    it("should has transactions data", () => {
      renderTransactionsList();

      const hasTransaction = screen.getByRole("dialog", {
        name: "Has Transactions",
      });
      expect(hasTransaction).toBeInTheDocument();
    });
    it("should empty transactions data", () => {
      renderTransactionsList({
        ...mockProps,
        TransactionsListData: [],
      });

      const emptyTransaction = screen.getByText("Tidak ada transaksi");

      expect(emptyTransaction).toBeInTheDocument();
    });
  });

  describe("CSS condition", () => {
    it("constainer status ACTIVE", () => {
      renderTransactionsList();
      const hasTransaction = screen.getByRole("dialog", {
        name: "Has Transactions",
      });

      expect(hasTransaction).toHaveClass("bg-zinc-950");
    });
    it("constainer status FINISH", () => {
      renderTransactionsList({
        ...mockProps,
        TransactionsListData: mockProps.TransactionsListData.map((i) => ({
          ...i,
          status: "FINISH" as const,
        })),
      });

      const hasTransaction = screen.getByRole("dialog", {
        name: "Has Transactions",
      });

      expect(hasTransaction).toHaveClass("bg-red-500/5");
    });
  });

  // * SWITCH RENDER ACTION
  describe("check pop up render", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      renderTransactionsList();
    });
    it("Pop up detail images", () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Button Popup detailImage",
        }),
      );

      expect(mockPropsPopUpShowImage).toHaveBeenCalled();

      expect(
        screen.getByRole("dialog", {
          name: "Mock Popup Show Image",
        }),
      ).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("button", {
          name: "Close",
        }),
      );

      expect(
        screen.queryByRole("dialog", {
          name: "Mock Popup Show Image",
        }),
      ).not.toBeInTheDocument();
    });
    it("Pop up put images", () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Button Popup putImage",
        }),
      );

      expect(mockPropsPutImage).toHaveBeenCalled();

      expect(
        screen.getByRole("dialog", {
          name: "Mock Popup Put Image",
        }),
      ).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("button", {
          name: "Close",
        }),
      );
      expect(
        screen.queryByRole("dialog", {
          name: "Mock Popup Put Image",
        }),
      ).not.toBeInTheDocument();
    });
    it("Pop up delete images", () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Button Popup deleteImage",
        }),
      );

      expect(mockPropsDeleteImage).toHaveBeenCalled();

      expect(
        screen.getByRole("dialog", {
          name: "Mock Popup Delete Image",
        }),
      ).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("button", {
          name: "Close",
        }),
      );
      expect(
        screen.queryByRole("dialog", {
          name: "Mock Popup Delete Image",
        }),
      ).not.toBeInTheDocument();
    });
  });
});

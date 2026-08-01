import { render, screen, fireEvent } from "@testing-library/react";
import TransactionList from "@/app/(pages)/transaction/components/transactions-list";

// ? MOCK IMPORT
import {
  MockTransactionsListData,
  MockPutFormTransactionsData,
  MockDeleteFormTransactionsData,
} from "@/app/__tests__/mocks/(pages)/transaction/transaction.mock";

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
        <div data-testid="mock-pop-up-show-image">
          <button data-testid="close-popup" onClick={onClose}>
            Close
          </button>
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
        <div data-testid="mock-pop-up-put-image">
          <button data-testid="close-popup" onClick={onClose}>
            Close
          </button>
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
      <div data-testid="mock-pop-up-delete-image">
        <button data-testid="close-popup" onClick={onClose}>
          Close
        </button>
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

      const title = screen.getByTestId("title");
      expect(title).toHaveTextContent("Riwayat Transaksi");
    });
    it("check has information", () => {
      renderTransactionsList();

      const information = screen.getByTestId("information-transaction");
      expect(information).toBeInTheDocument();
    });
    it("check no information", () => {
      const { rerender } = renderTransactionsList();

      const updateTransactionData = {
        ...mockProps,
        TransactionsListData: mockProps.TransactionsListData.map((i) => ({
          ...i,
          information: "",
        })),
      };

      rerender(<TransactionList {...updateTransactionData} />);

      const information = screen.getByTestId("information-transaction");
      expect(information).toHaveTextContent("Transaction");
    });
    it("check nominal more than > 50.000", () => {
      const { rerender } = renderTransactionsList();

      const updateTransactionData = {
        ...mockProps,
        TransactionsListData: mockProps.TransactionsListData.map((i) => ({
          ...i,
          nominal: 51000,
        })),
      };

      rerender(<TransactionList {...updateTransactionData} />);

      const nominal = screen.getByTestId("nominal-transaction");
      expect(nominal).toHaveTextContent("(Hemat Oy !!)");
      expect(nominal).toHaveClass("text-red-500");
    });
    it("check nominal less than <= 50.000", () => {
      renderTransactionsList();

      const nominal = screen.getByTestId("nominal-transaction");
      expect(nominal).toHaveTextContent("-");
      expect(nominal).toHaveClass("text-emerald-600");
    });

    it("should has transactions data", () => {
      renderTransactionsList();

      const hasTransaction = screen.getByTestId("has-transaction");
      expect(hasTransaction).toBeInTheDocument();
    });
    it("should empty transactions data", () => {
      const { rerender } = renderTransactionsList();

      const updateTransactionData = {
        ...mockProps,
        TransactionsListData: [],
      };

      rerender(<TransactionList {...updateTransactionData} />);

      const emptyTransaction = screen.getByTestId("empty-transaction");
      expect(emptyTransaction).toBeInTheDocument();
    });
  });
  describe("CSS condition", () => {
    it("constainer status ACTIVE", () => {
      renderTransactionsList();
      const hasTransaction = screen.getByTestId("has-transaction");

      expect(hasTransaction).toHaveClass("bg-transparent");
    });
    it("constainer status FINISH", () => {
      const { rerender } = renderTransactionsList();

      const updateTransactionData = {
        ...mockProps,
        TransactionsListData: mockProps.TransactionsListData.map((i) => ({
          ...i,
          status: "FINISH" as const,
        })),
      };

      rerender(<TransactionList {...updateTransactionData} />);

      const hasTransaction = screen.getByTestId("has-transaction");

      expect(hasTransaction).toHaveClass("bg-red-500");
    });
  });

  // * SWITCH RENDER ACTION
  describe("check pop up render", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      renderTransactionsList();
    });
    it("Pop up detail images", () => {
      fireEvent.click(screen.getByTestId("button-popup-detailImage"));

      expect(mockPropsPopUpShowImage).toHaveBeenCalled();

      expect(screen.getByTestId("mock-pop-up-show-image")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("close-popup"));

      expect(
        screen.queryByTestId("mock-pop-up-show-image"),
      ).not.toBeInTheDocument();
    });
    it("Pop up put images", () => {
      fireEvent.click(screen.getByTestId("button-popup-putImage"));

      expect(mockPropsPutImage).toHaveBeenCalled();

      expect(screen.getByTestId("mock-pop-up-put-image")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("close-popup"));

      expect(
        screen.queryByTestId("mock-pop-up-put-image"),
      ).not.toBeInTheDocument();
    });
    it("Pop up delete images", () => {
      fireEvent.click(screen.getByTestId("button-popup-deleteImage"));

      expect(mockPropsDeleteImage).toHaveBeenCalled();

      expect(
        screen.getByTestId("mock-pop-up-delete-image"),
      ).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("close-popup"));

      expect(
        screen.queryByTestId("mock-pop-up-delete-image"),
      ).not.toBeInTheDocument();
    });
  });
});

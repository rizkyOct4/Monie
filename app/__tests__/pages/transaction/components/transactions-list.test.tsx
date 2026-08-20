import { render, screen, fireEvent } from "@testing-library/react";
import TransactionList from "@/app/(pages)/transaction/components/transactions-list";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";
import { LoadingIndicator } from "@/components/ui/loading-indicatior";

// ? MOCK IMPORT
import {
  MockTransactionsListData,
  MockPutFormTransactionsData,
  MockDeleteFormTransactionsData,
} from "@/app/__mocks__/(pages)/transaction/transaction.mock";

const mockProps = {
  TransactionsListData: MockTransactionsListData,
  setIdTransaction: jest.fn(),
  fetchNextPage: jest.fn(),
  hasNextPage: true,
  isFetchingNextPage: false,
};

const useInViewMock = useInView as jest.Mock;
jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

// * MOCK LAZY NAMED COMPONENTS ===============
const mockPropsPopUpShowImage = jest.fn();
const mockPropsPutImage = jest.fn();
const mockPropsDeleteImage = jest.fn();

jest.mock(
  "@/app/(pages)/transaction/components/lazy-load/index.lazy",
  () => ({
    __esModule: true,

    PopUpShowImages: ({
      images,
      onClose,
    }: {
      images: typeof MockTransactionsListData[0]["images"];
      onClose: () => void;
    }) => {
      mockPropsPopUpShowImage({
        images,
        onClose,
      });

      return (
        <div role="dialog" aria-label="Mock Popup Show Image">
          <button onClick={onClose}>Close</button>
        </div>
      );
    },

    LazyFormPutTransaction: ({
      putValue,
      onClose,
    }: {
      putValue: typeof MockPutFormTransactionsData;
      onClose: () => void;
    }) => {
      mockPropsPutImage({
        putValue,
        onClose,
      });

      return (
        <div role="dialog" aria-label="Mock Popup Put Image">
          <button onClick={onClose}>Close</button>
        </div>
      );
    },

    LazyDeleteTransaction: ({
      deleteValue,
      onClose,
    }: {
      deleteValue: typeof MockDeleteFormTransactionsData;
      onClose: () => void;
    }) => {
      mockPropsDeleteImage({
        deleteValue,
        onClose,
      });

      return (
        <div role="dialog" aria-label="Mock Popup Delete Image">
          <button onClick={onClose}>Close</button>
        </div>
      );
    },
  }),
);

jest.mock("@/components/ui/loading-indicatior", () => ({
  __esModule: true,
  default: () => <div role="status" aria-label="Loading Transactions" />,
}));

const mockedUseSearchParams = useSearchParams as jest.Mock;

mockedUseSearchParams.mockReturnValue({
  get: jest.fn().mockReturnValue("Tes"),
});

const renderTransactionsList = (props = mockProps) =>
  render(<TransactionList {...props} />);

describe("Render Transaction List", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useInViewMock.mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });
  });
  describe("Render Transaction Section", () => {
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

  describe("Infinite Scroll", () => {
    it("should fetch next page when transaction is in view", () => {
      useInViewMock.mockReturnValue({
        ref: jest.fn(),
        inView: true,
      });

      renderTransactionsList({
        ...mockProps,
        hasNextPage: true,
        isFetchingNextPage: false,
      });

      expect(mockProps.fetchNextPage).toHaveBeenCalled();
    });

    it("should not fetch next page when transaction is not in view", () => {
      useInViewMock.mockReturnValue({
        ref: jest.fn(),
        inView: false,
      });

      renderTransactionsList({
        ...mockProps,
        hasNextPage: true,
        isFetchingNextPage: false,
      });

      expect(mockProps.fetchNextPage).not.toHaveBeenCalled();
    });

    it("should not fetch next page when there is no next page", () => {
      useInViewMock.mockReturnValue({
        ref: jest.fn(),
        inView: true,
      });

      renderTransactionsList({
        ...mockProps,
        hasNextPage: false,
        isFetchingNextPage: false,
      });

      expect(mockProps.fetchNextPage).not.toHaveBeenCalled();
    });
  });
});

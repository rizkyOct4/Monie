import { render, screen, fireEvent } from "@testing-library/react";
import SearchIdTransaction from "@/app/(pages)/transaction/components/form/post/search-id-transactions";
import { TransactionContext } from "@/app/context/context";
import { MockUseQueryIdTransactions } from "@/app/__mocks__/(pages)/transaction/query/query-transactions.mock";

const MockContext = MockUseQueryIdTransactions();

const MockProps = {
  setIdExisted: jest.fn(),
  setValue: jest.fn()
};

const RenderSearchIdTransaction = (
  props = MockProps,
  context = MockContext,
) => {
  return render(
    <TransactionContext.Provider value={context}>
      <SearchIdTransaction {...props} />
    </TransactionContext.Provider>,
  );
};

describe("Render search id transaction", () => {
  describe("Normal Open Button ID Transaction", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Open list ID transaction", () => {
      RenderSearchIdTransaction();

      fireEvent.click(
        screen.getByRole("button", {
          name: "Open list ID transaction",
        }),
      );

      const containerListIdTransaction = screen.getByRole("dialog", {
        name: "Container List ID Transaction",
      });

      expect(containerListIdTransaction).toBeInTheDocument();
    });

    it("Select ID transaction", () => {
      RenderSearchIdTransaction();

      fireEvent.click(
        screen.getByRole("button", {
          name: "Open list ID transaction",
        }),
      );

      const SelectButtonIdTransaction = screen.getByRole("button", {
        name: "List ID transaction random-id-1",
      });
      const SelectedIdValue = screen.getByTestId("selected-id");
      const ContainerListIdTransaction = screen.queryByRole("dialog", {
        name: "Container List ID Transaction",
      });

      fireEvent.click(SelectButtonIdTransaction);

      expect(SelectedIdValue).toHaveTextContent("janea-1");

      expect(ContainerListIdTransaction).not.toBeInTheDocument();
    });

    it("Has No Data", () => {
      RenderSearchIdTransaction(MockProps, {
        ...MockContext,
        IdTransactionsListData: [],
      });

      fireEvent.click(
        screen.getByRole("button", {
          name: "Open list ID transaction",
        }),
      );

      expect(
        screen.getByRole("status", {
          name: "Has No Data",
        }),
      ).toBeInTheDocument();
    });
  });

  describe("Search ID Transaction", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Open search input", () => {
      RenderSearchIdTransaction();

      const searchButton = screen.getByRole("button", {
        name: "Search Button",
      });
      const containerSearchIDTransaction = screen.getByRole("button", {
        name: "Search Button",
      });

      fireEvent.click(searchButton);

      expect(containerSearchIDTransaction).toBeInTheDocument();
    });

    it("Value Search ID Transaction -> then click", () => {
      const { rerender } = RenderSearchIdTransaction();

      const searchButton = screen.getByRole("button", {
        name: "Search Button",
      });

      fireEvent.click(searchButton);

      const inputSearch = screen.getByLabelText("Input Search ID Transaction");

      // ? CHANGE EVENT
      fireEvent.change(inputSearch, {
        target: {
          value: MockContext.search,
        },
      });

      //   * IS LOADING =========================
      const updateContextIsLoadingTrue = {
        ...MockContext,
        isFetchingSearchIdTransaction: true,
      };

      rerender(
        <TransactionContext.Provider value={updateContextIsLoadingTrue}>
          <SearchIdTransaction {...MockProps} />
        </TransactionContext.Provider>,
      );

      expect(
        screen.getByRole("status", {
          name: "Is Loading Search",
        }),
      ).toBeInTheDocument();

      //   * IS LOADING FALSE =========================
      const updateContextIsLoadingFalse = {
        ...MockContext,
        isFetchingSearchIdTransaction: false,
      };

      rerender(
        <TransactionContext.Provider value={updateContextIsLoadingFalse}>
          <SearchIdTransaction {...MockProps} />
        </TransactionContext.Provider>,
      );

      expect(
        screen.queryByRole("status", {
          name: "Is Loading Search",
        }),
      ).not.toBeInTheDocument();

      // * SELECT SEARCH ID TRANSACTION
      const SearchIDTransactionButton = screen.getByRole("button", {
        name: "Search ID Transaction: random-search-id-1",
      });

      fireEvent.click(SearchIDTransactionButton);

      const SelectedIdValue = screen.getByTestId("selected-id");
      expect(SelectedIdValue).toHaveTextContent("yoinkMAster-1");
    });
  });
});

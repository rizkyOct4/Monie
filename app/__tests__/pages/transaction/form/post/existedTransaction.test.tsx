import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ExistedTransactions from "@/app/(pages)/transaction/components/form/post/existed-transaction";
import { TransactionContext } from "@/app/context/context";
import SearchIdTransaction from "@/app/(pages)/transaction/components/form/post/search-id-transactions";

jest.mock(
  "@/app/(pages)/transaction/components/form/post/search-id-transactions",
  () => ({
    __esModule: true,
    default: () => <div role="dialog" aria-label="Search ID Transaction" />,
  }),
);

const MockProps = {
  onClose: jest.fn(),
};

const MockContext = {
  postTransaction: jest.fn(),
  isPendingPostTransaction: false,
  setIsOpenIdTranscation: true,
};

const RenderExisterTransactions = (
  props = MockProps,
  context = MockContext,
) => {
  return render(
    <TransactionContext.Provider value={context}>
      <ExistedTransactions {...props} />
    </TransactionContext.Provider>,
  );
};

describe("Render Existed Transactions", () => {
  describe("input value transaction", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Transaction", () => {
      RenderExisterTransactions();
    });
  });
});


// TODO tomorrow FINISH THIS THING !! 
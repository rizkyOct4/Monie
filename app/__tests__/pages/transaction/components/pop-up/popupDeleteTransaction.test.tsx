import { render, screen, fireEvent } from "@testing-library/react";
import PopUpDeleteTransaction from "@/app/(pages)/transaction/components/pop-up/pop-up-delete";
import { MockDeleteFormTransactionsData } from "@/app/__tests__/mocks/(pages)/transaction/transaction.mock";
import { TransactionContext } from "@/app/context/context";
import type { PopUpDeleteTransactionProps } from "@/app/(pages)/transaction/components/pop-up/pop-up-delete";
import { MockUseMutationDeleteTransactions } from "@/app/__tests__/mocks/(pages)/transaction/mutation/mutation.delete.mock";

const mockContext = MockUseMutationDeleteTransactions();

const mockProps: PopUpDeleteTransactionProps = {
  deleteValue: MockDeleteFormTransactionsData,
  onClose: jest.fn(),
};

const renderDeleteForm = (props = mockProps, context = mockContext) =>
  render(
    <TransactionContext.Provider value={context}>
      <PopUpDeleteTransaction {...props} />
    </TransactionContext.Provider>,
  );

describe("Render Popup delete form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("close btn", () => {
    renderDeleteForm();

    fireEvent.click(screen.getByTestId("close-popup"));

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });
  it("should show normal button when not pending", () => {
    // ! PARAMS dari renderDeleteForm itu ada 2, jika mau diedit pakai mock yg sesuai !!!
    renderDeleteForm(mockProps, {
      ...mockContext,
      isPendingDeleteTransaction: false,
    });

    expect(screen.getByTestId("submit-delete-btn")).toHaveTextContent("Hapus");
  });

  //   it("accept delete transaction", () => {
  //     fireEvent.click(screen.getByTestId("submit-delete-btn"));

  //     const isLoading = screen.getByTestId("is-loading-delete")

  //     expect(isLoading).toBeInTheDocument()

  //   })
});

// TODO LOOK FOR RERENDER !! DONT FKING REPEAT URSELF !!
// TODO HOOK return from react query ITS MUST BE A FUNCTION !!!
//  TODO MOCK DATA ITS MUST BE AN OBJECT !! DONT FKING FORGET !!! 
// TODO isFetching = true, refetch = function, mutation (isLoading = true)

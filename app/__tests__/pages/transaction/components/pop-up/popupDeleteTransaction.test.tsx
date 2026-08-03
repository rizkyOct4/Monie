import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PopUpDeleteTransaction from "@/app/(pages)/transaction/components/pop-up/pop-up-delete";
import { MockDeleteFormTransactionsData } from "@/app/__mocks__/(pages)/transaction/transaction.mock";
import { TransactionContext } from "@/app/context/context";
import type { PopUpDeleteTransactionProps } from "@/app/(pages)/transaction/components/pop-up/pop-up-delete";
import { MockUseMutationDeleteTransactions } from "@/app/__mocks__/(pages)/transaction/mutation/mutation.delete.mock";

const mockContext = MockUseMutationDeleteTransactions();

const mockProps: PopUpDeleteTransactionProps = {
  deleteValue: MockDeleteFormTransactionsData,
  onClose: jest.fn(),
};

const renderDeleteForm = (props = mockProps, context = mockContext) => {
  return render(
    <TransactionContext.Provider value={context}>
      <PopUpDeleteTransaction {...props} />
    </TransactionContext.Provider>,
  );
};

describe("Render Popup delete form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("close btn", () => {
    renderDeleteForm();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Batal",
      }),
    );

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });
  it("should show normal button when not pending", () => {
    // ! PARAMS dari renderDeleteForm itu ada 2, jika mau diedit pakai mock yg sesuai !!!
    renderDeleteForm(mockProps, {
      ...mockContext,
      isPendingDeleteTransaction: false,
    });

    expect(
      screen.getByRole("button", {
        name: "Hapus",
      }),
    ).toHaveTextContent("Hapus");
  });

  it("should success delete transaction and close popup", async () => {
    const { rerender } = renderDeleteForm(mockProps, {
      ...mockContext,
      isPendingDeleteTransaction: false,
    });

    fireEvent.submit(
      screen.getByRole("form", {
        name: "Delete Transaction Form",
      }),
    );

    const updateContext = {
      ...mockContext,
      isPendingDeleteTransaction: true,
    };

    rerender(
      <TransactionContext.Provider value={updateContext}>
        <PopUpDeleteTransaction {...mockProps} />
      </TransactionContext.Provider>,
    );

    await waitFor(() => {
      expect(mockContext.deleteTransaction).toHaveBeenCalledWith(
        MockDeleteFormTransactionsData,
      );
      expect(mockContext.deleteTransaction).toHaveBeenCalledTimes(1);

      expect(
        screen.getByRole("status", {
          name: "Is Loading Delete",
        }),
      ).toBeInTheDocument();

      expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });
  });
  it("should failed delete transaction and close popup", async () => {
    const error = new Error("Delete failed");

    const ErrorDeleteTransaction = jest.fn().mockRejectedValue(error); // ! created MOCK FUNCTION which is return ERROR !!

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { rerender } = renderDeleteForm(mockProps, {
      deleteTransaction: ErrorDeleteTransaction,
      isPendingDeleteTransaction: false,
    });

    fireEvent.submit(
      screen.getByRole("form", {
        name: "Delete Transaction Form",
      }),
    );

    const updateContext = {
      ...mockContext,
      isPendingDeleteTransaction: true,
    };

    rerender(
      <TransactionContext.Provider value={updateContext}>
        <PopUpDeleteTransaction {...mockProps} />
      </TransactionContext.Provider>,
    );

    await waitFor(() => {
      expect(ErrorDeleteTransaction).toHaveBeenCalledTimes(1);
      expect(ErrorDeleteTransaction).toHaveBeenCalledWith(
        MockDeleteFormTransactionsData,
      );

      expect(
        screen.getByRole("status", {
          name: "Is Loading Delete",
        }),
      ).toBeInTheDocument();

      expect(consoleSpy).toHaveBeenCalledWith(error);

      expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });
    consoleSpy.mockRestore();
  });
});

// TODO LOOK FOR RERENDER !! DONT FKING REPEAT URSELF !!
// TODO HOOK return from react query ITS MUST BE A FUNCTION !!!
// TODO MOCK DATA ITS MUST BE AN OBJECT !! DONT FKING FORGET !!!
// TODO isFetching = true, refetch = function, mutation (isLoading = true)
// ! IF button has already text inside those, DONT NEED TO ADD MORE aria-label !!!!

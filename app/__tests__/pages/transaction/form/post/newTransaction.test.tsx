import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TransactionContext } from "@/app/context/context";
import NewTransaction from "@/app/(pages)/transaction/components/form/post/new-transaction";
import {
  MockUseQueryNewTransactions,
  MockPostFormNewIdTransactionsData,
} from "@/app/__mocks__/(pages)/transaction/mutation/mutation.post.mock";
import { MockError } from "@/app/__mocks__/error.mock";

const MockContext = MockUseQueryNewTransactions();

const MockProps = {
  onClose: jest.fn(),
};

const RenderNewTransaction = (context = MockContext, props = MockProps) => {
  return render(
    <TransactionContext.Provider value={context}>
      <NewTransaction {...props} />
    </TransactionContext.Provider>,
  );
};

describe("Render New Transaction", () => {
  describe("Before submit", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      RenderNewTransaction();
    });

    it("click ID Icon Help", () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "?",
        }),
      );

      expect(
        screen.getByRole("dialog", {
          name: "ID Icon Help",
        }),
      ).toBeInTheDocument();
    });
    it("ID Error input", async () => {
      const input = screen.getByLabelText(/name/i);

      fireEvent.change(input, {
        target: { value: "!@#$%^&*" },
      });

      await waitFor(() => {
        expect(screen.getByTestId("error-nameTransaction")).toBeInTheDocument();
      });
    });
    it("Nominal Error input", async () => {
      const input = screen.getByLabelText(/nominal/i);

      fireEvent.change(input, {
        target: { value: "1000000000" },
      });

      await waitFor(() => {
        expect(screen.getByTestId("error-initialNominal")).toBeInTheDocument();
      });
    });
  });

  describe("FETCH After Submit", () => {
    // ? Reusable Function !!
    const fillAndSubmitForm = () => {
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: MockPostFormNewIdTransactionsData.nameTransaction },
      });

      fireEvent.change(screen.getByLabelText(/nominal/i), {
        target: { value: MockPostFormNewIdTransactionsData.initialNominal },
      });

      fireEvent.submit(
        screen.getByRole("form", {
          name: "New Transaction Form",
        }),
      );
    };

    it("loading", () => {
      RenderNewTransaction(
        {
          ...MockContext,
          isPendingNewPostTransaction: true,
        },
        MockProps,
      );

      expect(
        screen.getByRole("status", {
          name: "Is Loading New Transaction",
        }),
      ).toBeInTheDocument();
    });

    it("should success post new id transaction ", async () => {
      RenderNewTransaction();

      fillAndSubmitForm();

      await waitFor(() => {
        expect(MockContext.newPostTransaction).toHaveBeenCalledWith({
          ...MockPostFormNewIdTransactionsData,
          date: expect.any(Date),
        });
        expect(MockContext.newPostTransaction).toHaveBeenCalledTimes(1);
      });
    });

    it("should error", async () => {
      const { RejectedMock, consoleSpy, error } = MockError();
      RenderNewTransaction(
        {
          ...MockContext,
          newPostTransaction: RejectedMock,
        },
        MockProps,
      );

      fillAndSubmitForm();

      await waitFor(() => {
        expect(MockContext.newPostTransaction).toHaveBeenCalledWith({
          ...MockPostFormNewIdTransactionsData,
          date: expect.any(Date),
        });
        expect(MockContext.newPostTransaction).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(error);
      });
      consoleSpy.mockRestore();
    });
  });
});

// ! FORM VALIDASI ZOD IS ASYNC FUNCTION !!!!
// TODO besok buat project baru, bersih" !!!! DEPLOY JUGA !!

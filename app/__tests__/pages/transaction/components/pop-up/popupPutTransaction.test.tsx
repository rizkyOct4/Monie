import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormPut from "@/app/(pages)/transaction/components/pop-up/pop-up-form-put";
import {
  MockPutValueProps,
  MockInputMultipleImages,
  MockValuePutTransaction,
} from "@/app/__mocks__/(pages)/transaction/actions/putTransaction.mock";
import { MockUseSessionClient } from "@/app/__mocks__/session.mock";
import { TransactionContext } from "@/app/context/context";
import { MockUseQueryPutTransactions } from "@/app/__mocks__/(pages)/transaction/mutation/mutation.put.mock";

jest.mock("@/_lib/c-session", () => ({
  useSessionClient: jest.fn(),
}));

const ClientSession = MockUseSessionClient();

const MockProps = {
  putValue: MockPutValueProps,
  onClose: jest.fn(),
};

const MockContext = MockUseQueryPutTransactions();

const RenderPutFormTransaction = (props = MockProps, context = MockContext) => {
  return render(
    <TransactionContext.Provider value={context}>
      <FormPut {...props} />
    </TransactionContext.Provider>,
  );
};

describe("Render Put Form Transaction", () => {
  describe("Component test", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      RenderPutFormTransaction();
    });

    it("Close Button", () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Close Btn",
        }),
      );
      expect(MockProps.onClose).toHaveBeenCalledTimes(1);
    });
    it("users action change date", () => {
      // ? FIND EVENT
      const date = screen.getByLabelText("Tanggal");

      // ? CHANGE EVENT
      fireEvent.change(date, {
        target: {
          value: "2026-08-07T13:59",
        },
      });

      expect(date).toHaveValue("2026-08-07T13:59");
    });
    it("users action change images", () => {
      // ? FIND EVENT
      const imageInput = screen.getByLabelText(
        "Lampiran Foto",
      ) as HTMLInputElement;

      const { file1, file2 } = MockInputMultipleImages();

      fireEvent.change(imageInput, {
        target: {
          files: [file1, file2],
        },
      });

      expect(imageInput.files).toHaveLength(2);
    });
    it("users action delete images", async () => {
      const imageInput = screen.getByLabelText(
        "Lampiran Foto",
      ) as HTMLInputElement;
      const { file1, file2 } = MockInputMultipleImages();

      fireEvent.change(imageInput, {
        target: {
          files: [file1, file2],
        },
      });

      await waitFor(() => {
        const buttonDelete = screen.getByRole("button", {
          name: "Delete idx: 0",
        });
        fireEvent.click(buttonDelete);
        expect(screen.queryByTestId("Image idx: 0")).not.toBeInTheDocument();
      });
    });
    it("users action change information", () => {
      // ? FIND EVENT
      const information = screen.getByLabelText("Keterangan");

      // ? CHANGE EVENT
      fireEvent.change(information, {
        target: {
          value: "Lorem15",
        },
      });

      expect(information).toHaveValue("Lorem15");
    });
    it("users action change nominal", () => {
      // ? FIND EVENT
      const nominal = screen.getByLabelText("Nominal");

      // ? CHANGE EVENT
      fireEvent.change(nominal, {
        target: {
          value: 100000,
        },
      });

      expect(nominal).toHaveValue(100000);
    });
  });

  describe("Loading After Submit", () => {
    const fillAndSubmitForm = () => {
      fireEvent.change(screen.getByLabelText("Tanggal"), {
        target: { value: MockValuePutTransaction.date },
      });

      // ? FIND EVENT
      const imageInput = screen.getByLabelText(
        "Lampiran Foto",
      ) as HTMLInputElement;

      const { file1, file2 } = MockInputMultipleImages();

      fireEvent.change(imageInput, {
        target: {
          files: [file1, file2],
        },
      });

      fireEvent.change(screen.getByLabelText("Keterangan"), {
        target: { value: MockValuePutTransaction.information },
      });

      fireEvent.change(screen.getByLabelText("Nominal"), {
        target: { value: MockValuePutTransaction.nominal },
      });

      fireEvent.submit(
        screen.getByRole("form", {
          name: "Put Transaction Form",
        }),
      );
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Loading", () => {
      RenderPutFormTransaction();

      fillAndSubmitForm();

      RenderPutFormTransaction(MockProps, {
        ...MockContext,
        isPendingPutTransaction: true,
      });

      expect(
        screen.getByRole("dialog", {
          name: "Is Loading",
        }),
      ).toBeInTheDocument();
    });

    it("success put transaction", async () => {
      RenderPutFormTransaction();

      fillAndSubmitForm();
      
      RenderPutFormTransaction(MockProps, {
        ...MockContext,
        isPendingPutTransaction: true,
      });

      await waitFor(() => {
        expect(MockContext.putTransaction).toHaveBeenCalledWith(
          MockValuePutTransaction,
        );
        expect(MockContext.putTransaction).toHaveBeenCalledTimes(1);
        expect(MockProps.onClose).toHaveBeenCalledTimes(1);
      });
    });
  });
});

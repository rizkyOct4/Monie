import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormPut from "@/app/(pages)/transaction/components/form/update/pop-up-form-put";
import {
  MockPutValueProps,
  MockInputMultipleImages,
  MockValuePutTransaction,
} from "@/app/__mocks__/(pages)/transaction/actions/putTransaction.mock";
import { MockUseSessionClient } from "@/app/__mocks__/session.mock";
import { TransactionContext } from "@/app/context/context";
import { MockError } from "@/app/__mocks__/error.mock";

export const MockCloudinaryResponse = [
  {
    public_id: "random-id-1",
    secure_url: "random-url-1",
  },
  {
    public_id: "random-id-2",
    secure_url: "random-url-2",
  },
];

export const MockUploadMultipleToCloudinary = jest.fn();
jest.mock("@/_utils/direct-upload-cloud", () => ({
  uploadMultipleToCloudinary: jest.fn(
    ({
      files,
      publicId,
      type,
      id,
    }: {
      files: string[];
      publicId: string;
      type: "images";
      id: string;
    }) => {
      MockUploadMultipleToCloudinary({
        files,
        publicId,
        type,
        id,
      });

      return Promise.resolve(MockCloudinaryResponse);
    },
  ),
}));

jest.mock("@/_lib/c-session", () => ({
  useSessionClient: jest.fn(),
}));

const ClientSession = MockUseSessionClient();

const MockProps = {
  putValue: MockPutValueProps,
  onClose: jest.fn(),
};

const MockContext = {
  putTransaction: jest.fn(),
  isPendingPutTransaction: false,
};
// const MockContext = MockUseQueryPutTransactions();

const RenderPutFormTransaction = (props = MockProps, context = MockContext) => {
  return render(
    <TransactionContext.Provider value={context}>
      <FormPut {...props} />
    </TransactionContext.Provider>,
  );
};

const fillAndSubmitForm = async () => {
  fireEvent.change(screen.getByLabelText("Tanggal"), {
    target: { value: "2026-08-07T13:59" },
  });

  // // ? FIND EVENT
  // const imageInput = screen.getByLabelText("Lampiran Foto") as HTMLInputElement;

  // const { file1, file2 } = MockInputMultipleImages();

  // fireEvent.change(imageInput, {
  //   target: {
  //     files: [file1, file2],
  //   },
  // });

  // expect(await screen.findByAltText("Preview 0")).toBeInTheDocument();
  // expect(await screen.findByAltText("Preview 1")).toBeInTheDocument();

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

describe("Render Put Form Transaction", () => {
  describe("Component test", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      RenderPutFormTransaction();
    });

    it("Close Button", () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Close Popup",
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
    const untilLoading = async () => {
      const { rerender } = RenderPutFormTransaction();

      await fillAndSubmitForm();

      const updateContext = {
        ...MockContext,
        isPendingPutTransaction: true,
      };

      rerender(
        <TransactionContext.Provider value={updateContext}>
          <FormPut {...MockProps} />
        </TransactionContext.Provider>,
      );

      expect(
        screen.getByRole("dialog", {
          name: "Is Loading",
        }),
      ).toBeInTheDocument();
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Loading", async () => {
      await untilLoading();
    });

    // it("success put transaction", async () => {
    //   await untilLoading();

    //   console.log("=== AFTER UNTIL LOADING ===");

    //   console.log("Upload calls:", MockUploadMultipleToCloudinary.mock.calls);

    //   console.log(
    //     "putTransaction calls:",
    //     MockContext.putTransaction.mock.calls,
    //   );

    //   console.log("onClose calls:", MockProps.onClose.mock.calls);

    //   await waitFor(() => {
    //     expect(MockUploadMultipleToCloudinary).toHaveBeenCalledTimes(1);

    //     console.log(
    //       "=== INSIDE WAIT FOR ===",
    //       MockContext.putTransaction.mock.calls,
    //     );

    //     expect(MockContext.putTransaction).toHaveBeenCalledWith(
    //       MockValuePutTransaction,
    //     );

    //     expect(MockContext.putTransaction).toHaveBeenCalledTimes(1);

    //     expect(MockProps.onClose).toHaveBeenCalledTimes(1);
    //   });
    // });

    it("success put transaction", async () => {
      await untilLoading();

      await waitFor(() => {
        expect(MockUploadMultipleToCloudinary).toHaveBeenCalledTimes(1);
        expect(MockContext.putTransaction).toHaveBeenCalledTimes(1);
      });

      const actual = MockContext.putTransaction.mock.calls[0][0];

      console.log("========== ACTUAL PUT ==========");
      console.dir(actual, { depth: null });

      console.log("========== EXPECTED PUT ==========");
      console.dir(MockValuePutTransaction, { depth: null });

      console.log("========== UPLOAD ==========");
      console.dir(MockUploadMultipleToCloudinary.mock.calls, { depth: null });

      console.log("========== ON CLOSE ==========");
      console.dir(MockProps.onClose.mock.calls, { depth: null });

      expect(actual).toEqual(MockValuePutTransaction);

      expect(MockProps.onClose).toHaveBeenCalledTimes(1);
    });

    it("errors put transaction", async () => {
      const { RejectedMock, consoleSpy, error } = MockError();

      const errorContext = {
        ...MockContext,
        putTransaction: RejectedMock,
      };
      RenderPutFormTransaction(MockProps, errorContext);

      await fillAndSubmitForm();

      await waitFor(() => {
        expect(RejectedMock).toHaveBeenCalledWith(MockValuePutTransaction);

        expect(RejectedMock).toHaveBeenCalledTimes(1);

        expect(consoleSpy).toHaveBeenCalledWith(error);
      });

      consoleSpy.mockRestore();
    });
  });
});

// TODO dalamnya ketika di submit !!! LIAT LOGIC DI CLIENT KAU !! SEMUA DATA MOCK MASUK KE LOGIC JUGA !!!
// ! INPUT VALUE =>>>>>>> NOT AN OBJECT !! STRING !!!!

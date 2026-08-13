import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ExistedTransactions from "@/app/(pages)/transaction/components/form/post/existed-transaction";
import { TransactionContext } from "@/app/context/context";
import { MockUseSessionClient } from "@/app/__mocks__/session.mock";
import {
  MockPostTransactionForm,
  MockSendPostTransactionForm,
} from "@/app/__mocks__/(pages)/transaction/actions/postTransaction.mock";
import { MockInputMultipleImages } from "@/app/__mocks__/(pages)/transaction/actions/postTransaction.mock";
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

const mockPropsSearchIdTransaction = jest.fn();
jest.mock(
  "@/app/(pages)/transaction/components/form/post/search-id-transactions",
  () => ({
    __esModule: true,
    default: ({
      setIdExisted,
      setValue,
    }: {
      setIdExisted: React.Dispatch<React.SetStateAction<string>>;
      setValue: any;
    }) => {
      mockPropsSearchIdTransaction({ setIdExisted, setValue });

      return (
        <div role="dialog" aria-label="Mock Search ID Transaction">
          <button
            aria-label={`List ID transaction random-id-1`}
            onClick={() => {
              setIdExisted("random-id-1");
              setValue("nameTransaction", "janea-1");
            }}
          >
            janea-1
          </button>
          <button
            aria-label={`Search ID Transaction: random-search-id-1`}
            onClick={() => {
              setIdExisted("random-search-id-1");
              setValue("nameTransaction", "yoinkMAster-1");
            }}
          >
            yoinkMAster-1
          </button>
        </div>
      );
    },
  }),
);

const MockProps = {
  onClose: jest.fn(),
};

const MockContext = {
  postTransaction: jest.fn(),
  isPendingPostTransaction: false,
  setIsOpenIdTransaction: jest.fn(),
};

const RenderExistedTransactions = (
  props = MockProps,
  context = MockContext,
) => {
  return render(
    <TransactionContext.Provider value={context}>
      <ExistedTransactions {...props} />
    </TransactionContext.Provider>,
  );
};

const fillAndSubmitForm = async () => {
  fireEvent.change(screen.getByLabelText("Tanggal"), {
    target: { value: MockPostTransactionForm.date },
  });

  // ? FIND EVENT
  const imageInput = screen.getByLabelText("Lampiran Foto") as HTMLInputElement;

  const { file1, file2 } = MockInputMultipleImages();

  fireEvent.change(imageInput, {
    target: {
      files: [file1, file2],
    },
  });

  // Ini memastikan FileReader + setValue sudah selesai
  expect(await screen.findByAltText("Preview 0")).toBeInTheDocument();
  expect(await screen.findByAltText("Preview 1")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("Keterangan"), {
    target: { value: MockPostTransactionForm.information },
  });

  fireEvent.change(screen.getByLabelText("Nominal"), {
    target: { value: MockPostTransactionForm.nominal },
  });

  fireEvent.submit(
    screen.getByRole("form", {
      name: "Post Transaction Form",
    }),
  );
};

describe("Render Existed Transactions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const { publicId } = MockUseSessionClient();
  });

  describe("Has idExisted", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      const { publicId } = MockUseSessionClient();

      RenderExistedTransactions();

      fireEvent.click(
        screen.getByRole("button", {
          name: "List ID transaction random-id-1",
        }),
      );
    });

    it("Open List Form", () => {
      expect(
        screen.getByRole("dialog", {
          name: "List Form",
        }),
      ).toBeInTheDocument();
    });
    describe("Fill Form Post Transaction", () => {
      it("date", () => {
        const date = screen.getByLabelText("Tanggal");

        // ? CHANGE EVENT
        fireEvent.change(date, {
          target: {
            value: MockPostTransactionForm.date,
          },
        });

        expect(date).toHaveValue("2026-08-09T14:30");
      });
      it("images", async () => {
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

        expect(await screen.findByAltText("Preview 0")).toBeInTheDocument();
        expect(await screen.findByAltText("Preview 1")).toBeInTheDocument();
      });
      it("Delete images button", async () => {
        const imageInput = screen.getByLabelText(
          "Lampiran Foto",
        ) as HTMLInputElement;

        const { file1, file2 } = MockInputMultipleImages();

        fireEvent.change(imageInput, {
          target: {
            files: [file1, file2],
          },
        });

        // ! START DELETE
        const btn = await screen.findByRole("button", {
          name: "Delete button images 1",
        });

        fireEvent.click(btn);

        expect(screen.getAllByAltText(/Preview/)).toHaveLength(1);
        expect(screen.queryByAltText("Preview 1")).not.toBeInTheDocument();
      });
      it("information", () => {
        const information = screen.getByLabelText("Keterangan");

        fireEvent.change(information, {
          target: {
            value: MockPostTransactionForm.information,
          },
        });

        expect(information).toHaveValue("Pembelian kebutuhan sehari-hari");
      });
      it("nominal", () => {
        const nominal = screen.getByLabelText("Nominal");

        fireEvent.change(nominal, {
          target: {
            value: MockPostTransactionForm.nominal,
          },
        });

        expect(nominal).toHaveValue(150000);
      });
    });
  });
  describe("Has'n idExisted", () => {
    it("Fill", () => {
      RenderExistedTransactions();

      expect(
        screen.queryByRole("dialog", {
          name: "List Form",
        }),
      ).not.toBeInTheDocument();
    });
  });
  describe("Submit", () => {
    const untilLoading = async () => {
      const { rerender } = RenderExistedTransactions();

      fireEvent.click(
        screen.getByRole("button", {
          name: "List ID transaction random-id-1",
        }),
      );

      await fillAndSubmitForm();

      const updateContext = {
        ...MockContext,
        isPendingPostTransaction: true,
      };

      rerender(
        <TransactionContext.Provider value={updateContext}>
          <ExistedTransactions {...MockProps} />
        </TransactionContext.Provider>,
      );

      const isLoading = screen.getByRole("status", {
        name: "Is Loading Post",
      });

      expect(isLoading).toBeInTheDocument();
    };

    beforeEach(() => {
      jest.clearAllMocks();
      const { publicId } = MockUseSessionClient();
    });
    it("loading ....", async () => {
      await untilLoading();
    });

    it("Fetch success", async () => {
      await untilLoading();

      await waitFor(() => {
        expect(MockUploadMultipleToCloudinary).toHaveBeenCalledTimes(1);

        expect(MockUploadMultipleToCloudinary).toHaveBeenCalledWith({
          files: expect.any(Array),
          publicId: "ss12",
          type: "images",
          id: expect.any(String),
        });

        expect(MockContext.postTransaction).toHaveBeenCalledTimes(1);
      });

      expect(MockContext.postTransaction).toHaveBeenCalledWith(
        expect.objectContaining({
          ...MockSendPostTransactionForm,
          date: new Date(MockSendPostTransactionForm.date).toISOString(),
          images: expect.arrayContaining([
            expect.objectContaining({
              imageId: "random-id-1",
              imageUrl: "random-url-1",
            }),
            expect.objectContaining({
              imageId: "random-id-2",
              imageUrl: "random-url-2",
            }),
          ]),
        }),
      );
    });

    it("Fetch Failed", async () => {
      const { RejectedMock, consoleSpy, error } = MockError();

      const errorContext = {
        ...MockContext,
        postTransaction: RejectedMock,
        isPendingPostTransaction: false,
      };

      RenderExistedTransactions(MockProps, errorContext);

      fireEvent.click(
        screen.getByRole("button", {
          name: "List ID transaction random-id-1",
        }),
      );

      fillAndSubmitForm();

      await waitFor(() => {
        expect(RejectedMock).toHaveBeenCalledWith({
          ...MockSendPostTransactionForm,
          date: new Date(MockSendPostTransactionForm.date).toISOString(),
        });

        expect(RejectedMock).toHaveBeenCalledTimes(1);

        expect(consoleSpy).toHaveBeenCalledWith(error);
      });

      consoleSpy.mockRestore();
    });
  });
});

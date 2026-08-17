import { prisma } from "@/_lib/prisma/prisma-client";
import { PutTransaction } from "@/_lib/services/transaction/action/services-action-transaction-index";
import { MockValuePutTransaction } from "@/app/__mocks__/(pages)/transaction/actions/putTransaction.mock";

jest.mock("@/_lib/prisma/prisma-client", () => ({
  prisma: {
    $transaction: jest.fn(),
  },
}));

const MockTransaction = jest.fn();
const MockExecuteRaw = jest.fn();

const { ...rest } = MockValuePutTransaction;


describe("SERVICES PUT TRANSACTIONS", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback({
        $executeRaw: MockExecuteRaw,
      });
    });
  });

  describe("UpdateTransaction", () => {
    describe("INITIAL SALARY DB", () => {
      it("should increase salary remaining when new nominal is lower", async () => {
        const mockData = {
          ...MockValuePutTransaction,
          lastNominal: 2000,
          publicId: "ss12",
        };

        MockExecuteRaw.mockResolvedValue(1);

        await PutTransaction(mockData);

        expect(MockExecuteRaw).toHaveBeenCalled();
      });

      it("should decrease salary remaining when new nominal is higher", async () => {
        const mockData = {
          ...MockValuePutTransaction,
          nominal: 120000,
          publicId: "ss12",
        };

        MockExecuteRaw.mockResolvedValue(1);

        await PutTransaction(mockData);

        expect(MockExecuteRaw).toHaveBeenCalled();
      });
    });

    describe("TRANSACTIONS", () => {
      it("should update created_at and updated_at", async () => {
        const mockData = {
          ...MockValuePutTransaction,
          publicId: "ss12",
        };

        MockExecuteRaw.mockResolvedValue(1);

        await PutTransaction(mockData);

        expect(MockExecuteRaw).toHaveBeenCalled();
      });

      it("should update updated_at only", async () => {
        const mockData = {
          ...MockValuePutTransaction,
          wrongDate: false,
          publicId: "ss12",
        };

        MockExecuteRaw.mockResolvedValue(1);

        await PutTransaction(mockData);

        expect(MockExecuteRaw).toHaveBeenCalled();
      });
    });

    describe("TRANSACTION IMAGES", () => {
      it("should delete images when deleteImages > 0", async () => {
        const mockData = {
          ...MockValuePutTransaction,
          deleteImages: ["random-1", "random-2"],
          publicId: "ss12",
        };

        MockExecuteRaw.mockResolvedValue(1);

        await PutTransaction(mockData);

        expect(MockExecuteRaw).toHaveBeenCalledTimes(6);
      });

      it("should not delete images when deleteImages is empty", async () => {
        const mockData = {
          ...MockValuePutTransaction,
          deleteImages: [],
          publicId: "ss12",
        };

        MockExecuteRaw.mockResolvedValue(1);

        await PutTransaction(mockData);
      });
    });

    describe("TRANSACTION IMAGES -> NEW IMAGES", () => {
      it("should insert new images when newImages > 0", async () => {
        const mockData = {
          ...MockValuePutTransaction,
          publicId: "ss12",
        };

        MockExecuteRaw.mockResolvedValue(1);

        await PutTransaction(mockData);

        expect(MockExecuteRaw).toHaveBeenCalledTimes(4);
      });

      it("should not insert new images when newImages is empty", async () => {
        const mockData = {
          ...MockValuePutTransaction,
          newImages: [],
          publicId: "ss12",
        };

        MockExecuteRaw.mockResolvedValue(1);

        await PutTransaction(mockData);
      });
    });

    describe("ERROR HANDLING", () => {
      it("should throw when update initial salary fails", async () => {
        const mockData = {
          ...MockValuePutTransaction,
          publicId: "ss12",
        };

        MockExecuteRaw.mockRejectedValueOnce(
          new Error("Update initial salary failed"),
        );

        await expect(PutTransaction(mockData)).rejects.toThrow(
          "Update initial salary failed",
        );

        expect(MockExecuteRaw).toHaveBeenCalledTimes(1);
      });

      it("should throw when update transaction fails", async () => {
        const mockData = {
          ...MockValuePutTransaction,
          publicId: "ss12",
        };

        MockExecuteRaw.mockResolvedValueOnce(1).mockRejectedValueOnce(
          new Error("Update transaction failed"),
        );

        await expect(PutTransaction(mockData)).rejects.toThrow(
          "Update transaction failed",
        );

        expect(MockExecuteRaw).toHaveBeenCalledTimes(2);
      });

      it("should throw when delete transaction images fails", async () => {
        const mockData = {
          ...MockValuePutTransaction,
          deleteImages: ["random-1", "random-2"],
          publicId: "ss12",
        };

        MockExecuteRaw.mockResolvedValueOnce(1)
          .mockResolvedValueOnce(1)
          .mockRejectedValueOnce(new Error("Delete transaction image failed"));

        await expect(PutTransaction(mockData)).rejects.toThrow(
          "Delete transaction image failed",
        );

        expect(MockExecuteRaw).toHaveBeenCalledTimes(4);
      });

      it("should throw when insert new transaction images fails", async () => {
        const mockData = {
          ...MockValuePutTransaction,
          deleteImages: [],
          publicId: "ss12",
        };

        MockExecuteRaw.mockResolvedValueOnce(1)
          .mockResolvedValueOnce(1)
          .mockRejectedValueOnce(new Error("Insert transaction image failed"));

        await expect(PutTransaction(mockData)).rejects.toThrow(
          "Insert transaction image failed",
        );
      });
    });
  });
});

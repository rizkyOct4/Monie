import { prisma } from "@/_lib/prisma/prisma-client";
import {
  PostNewTransaction,
  PostCurrentTransaction,
} from "@/_lib/services/transaction/action/services-action-transaction-index";
import { MockPostFormNewIdTransactionsData } from "@/app/__mocks__/(pages)/transaction/mutation/mutation.post.mock";
import { MockSendPostTransactionForm } from "@/app/__mocks__/(pages)/transaction/actions/postTransaction.mock";

jest.mock("@/_lib/prisma/prisma-client", () => ({
  prisma: {
    $transaction: jest.fn(),
  },
}));

const MockTransaction = jest.fn();
const MockExecuteRaw = jest.fn();

const { id, initialNominal, date, nameTransaction } =
  MockPostFormNewIdTransactionsData;

describe("SERVICES POST TRANSACTIONS", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
      return callback({
        $executeRaw: MockExecuteRaw,
      });
    });
    // ! "Ketika service-ku meminta Prisma menjalankan transaction, pura-pura jalankan transaction tersebut dengan transaction object palsu yang $executeRaw-nya adalah mock."
    // ! "Kalau kode production memanggil prisma.$transaction(), jangan jalankan Prisma asli. Jalankan implementation palsu ini."
  });

  describe("PostNewTransaction", () => {
    it("should execute transaction and insert initial salary", async () => {
      const mockData = {
        publicId: "ss12",
        initialNominal,
        id,
        nameTransaction,
        date,
      };

      MockExecuteRaw.mockResolvedValue(1);

      await PostNewTransaction(mockData);

      expect(prisma.$transaction).toHaveBeenCalledTimes(1);
      expect(MockExecuteRaw).toHaveBeenCalledTimes(1);
    });

    it("should throw when database insert fails", async () => {
      const mockData = {
        publicId: "ss12",
        initialNominal,
        id,
        nameTransaction,
        date,
      };

      MockExecuteRaw.mockRejectedValue(new Error("Database error"));

      await expect(PostNewTransaction(mockData)).rejects.toThrow(
        "Database error",
      );
    });
  });

  describe("PostCurrentTransaction", () => {
    describe("SUCCESS", () => {
      it("should update initial salary and insert transaction", async () => {
        const mockData = {
          publicId: "ss12",
          ...MockSendPostTransactionForm,
          images: [],
        };

        MockExecuteRaw.mockResolvedValue(1);

        await PostCurrentTransaction(mockData);

        expect(prisma.$transaction).toHaveBeenCalledTimes(1);
        expect(MockExecuteRaw).toHaveBeenCalledTimes(2);
      });

      it("should insert transaction images when images exist", async () => {
        const mockData = {
          publicId: "ss12",
          ...MockSendPostTransactionForm,
        };

        MockExecuteRaw.mockResolvedValue(1);

        await PostCurrentTransaction(mockData);

        // UPDATE + INSERT transaction + INSERT images
        expect(MockExecuteRaw).toHaveBeenCalledTimes(4);
      });

      it("should not insert transaction images when images is empty", async () => {
        const mockData = {
          publicId: "ss12",
          ...MockSendPostTransactionForm,
          images: [],
        };

        MockExecuteRaw.mockResolvedValue(1);

        await PostCurrentTransaction(mockData);

        // UPDATE + INSERT transaction
        expect(MockExecuteRaw).toHaveBeenCalledTimes(2);
      });
    });

    describe("ERROR HANDLING", () => {
      it("should throw when update initial salary fails", async () => {
        const mockData = {
          publicId: "ss12",
          ...MockSendPostTransactionForm,
        };

        MockExecuteRaw.mockRejectedValueOnce(
          new Error("Update initial salary failed"),
        );

        await expect(PostCurrentTransaction(mockData)).rejects.toThrow(
          "Update initial salary failed",
        );

        expect(MockExecuteRaw).toHaveBeenCalledTimes(1);
      });

      it("should throw when insert transaction fails", async () => {
        const mockData = {
          publicId: "ss12",
          ...MockSendPostTransactionForm,
        };

        MockExecuteRaw.mockResolvedValueOnce(1).mockRejectedValueOnce(
          new Error("Insert transaction failed"),
        );

        await expect(PostCurrentTransaction(mockData)).rejects.toThrow(
          "Insert transaction failed",
        );

        expect(MockExecuteRaw).toHaveBeenCalledTimes(2);
      });

      it("should throw when insert transaction images fails", async () => {
        const mockData = {
          publicId: "ss12",
          ...MockSendPostTransactionForm,
        };

        MockExecuteRaw.mockResolvedValueOnce(1)
          .mockResolvedValueOnce(1)
          .mockRejectedValueOnce(new Error("Insert transaction image failed"));

        await expect(PostCurrentTransaction(mockData)).rejects.toThrow(
          "Insert transaction image failed",
        );

        expect(MockExecuteRaw).toHaveBeenCalledTimes(4);
      });
    });
  });
});

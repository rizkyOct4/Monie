import { prisma } from "@/_lib/prisma/prisma-client";
import { DeleteTransaction } from "@/_lib/services/transaction/action/services-action-transaction-index";
import { MockValuesDeleteTransactions } from "@/app/__mocks__/(pages)/transaction/actions/deleteTransaction.mock";

jest.mock("@/_lib/prisma/prisma-client", () => ({
  prisma: {
    $transaction: jest.fn(),
  },
}));

// const MockTransaction = jest.fn();
const MockExecuteRaw = jest.fn();

describe("SERVICES DELETE TRANSACTIONS", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (prisma.$transaction as jest.Mock).mockImplementation(
      async (callback) => {
        return callback({
          $executeRaw: MockExecuteRaw,
        });
      },
    );
  });

  describe("CASE deleteTransaction", () => {
    const mockData = {
      refId: MockValuesDeleteTransactions.refId,
      id: MockValuesDeleteTransactions.id,
      nominal: MockValuesDeleteTransactions.nominal,
      publicId: "ss12",
    };

    it("should execute all queries successfully", async () => {
      MockExecuteRaw.mockResolvedValue(1);

      await DeleteTransaction(mockData);

      expect(prisma.$transaction).toHaveBeenCalledTimes(1);
      expect(MockExecuteRaw).toHaveBeenCalledTimes(3);

      expect(MockExecuteRaw.mock.calls[0]).toBeDefined();
      expect(MockExecuteRaw.mock.calls[1]).toBeDefined();
      expect(MockExecuteRaw.mock.calls[2]).toBeDefined();
    });

    it("should throw when update initial salary fails", async () => {
      MockExecuteRaw.mockRejectedValueOnce(
        new Error("Update failed"),
      );

      await expect(
        DeleteTransaction(mockData),
      ).rejects.toThrow("Update failed");

      expect(MockExecuteRaw).toHaveBeenCalledTimes(1);
    });

    it("should throw when delete transaction fails", async () => {
      MockExecuteRaw
        .mockResolvedValueOnce(1)
        .mockRejectedValueOnce(
          new Error("Delete transaction failed"),
        );

      await expect(
        DeleteTransaction(mockData),
      ).rejects.toThrow("Delete transaction failed");

      expect(MockExecuteRaw).toHaveBeenCalledTimes(2);
    });

    it("should throw when delete images fails", async () => {
      MockExecuteRaw
        .mockResolvedValueOnce(1)
        .mockResolvedValueOnce(1)
        .mockRejectedValueOnce(
          new Error("Delete images failed"),
        );

      await expect(
        DeleteTransaction(mockData),
      ).rejects.toThrow("Delete images failed");

      expect(MockExecuteRaw).toHaveBeenCalledTimes(3);
    });
  });
});
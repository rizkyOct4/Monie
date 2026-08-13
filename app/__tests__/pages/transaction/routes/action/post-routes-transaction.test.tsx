/**
 * @jest-environment node
 */

import {
  PostNewTransaction,
  PostCurrentTransaction,
} from "@/_lib/services/transaction/action/services-action-transaction-index";
import { NextRequest } from "next/server";
import GetSession from "@/_lib/session";
import { POST } from "@/app/(pages)/transaction/api/action/route";
import { nanoid } from "nanoid";
import {
  MockPostTransactionForm,
  MockSendPostTransactionForm,
} from "@/app/__mocks__/(pages)/transaction/actions/postTransaction.mock";
import { MockPostFormNewIdTransactionsData } from "@/app/__mocks__/(pages)/transaction/mutation/mutation.post.mock";

jest.mock(
  "@/_lib/services/transaction/action/services-action-transaction-index",
  () => ({
    PostNewTransaction: jest.fn(),
    PostCurrentTransaction: jest.fn(),
  }),
);

jest.mock("@/_lib/session", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedSession = GetSession as jest.MockedFunction<typeof GetSession>;
const mockedPostNewTransaction = PostNewTransaction as jest.MockedFunction<
  typeof PostNewTransaction
>;
const mockedPostCurrentTransaction =
  PostCurrentTransaction as jest.MockedFunction<typeof PostCurrentTransaction>;

// * MOCK API =========
const createPOSTRequest = (query: string, body?: unknown) =>
  new NextRequest(`http://localhost/transaction/api/action?${query}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

describe("POST /transaction/api/action", () => {
  describe("CASE condition", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      mockedSession.mockResolvedValue({
        publicId: "ss12",
        name: "Asking",
      });

      // ! CHECK JIKA SESSION NULL
    });
    describe("newPostTransaction", () => {
      const reRequest = () => {
        const req = createPOSTRequest("key=newPostTransaction", {
          ...MockPostFormNewIdTransactionsData,
          date: expect.any(Date),
        });

        const expectedCalled = {
          ...MockPostFormNewIdTransactionsData,
          date: expect.any(Date),
          publicId: "ss12",
        };

        return { req, expectedCalled };
      };

      it("should return 200 when success", async () => {
        const { req, expectedCalled } = reRequest();
        mockedPostNewTransaction.mockResolvedValue(undefined);

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(200);

        expect(body).toEqual({
          message: "New Transaction Success",
        });

        expect(mockedPostNewTransaction).toHaveBeenCalledWith(expectedCalled);
      });
      it("should return 500 when service throws an error", async () => {
        const { req, expectedCalled } = reRequest();

        mockedPostNewTransaction.mockRejectedValue(
          new Error("Internal Server Error"),
        );

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(500);

        expect(body).toEqual({
          message: "Internal Server Error",
        });

        expect(mockedPostNewTransaction).toHaveBeenCalledWith(expectedCalled);
      });
    });

    describe("postTransaction", () => {
      const reRequest = () => {
        const req = createPOSTRequest("key=postTransaction", {
          ...MockSendPostTransactionForm,
          date: String(MockSendPostTransactionForm.date),
        });

        const expectedCalled = {
          ...MockSendPostTransactionForm,
          publicId: "ss12",
        };

        return { req, expectedCalled };
      };

      it("should return 200 when success", async () => {
        const { req, expectedCalled } = reRequest();
        mockedPostCurrentTransaction.mockResolvedValue(undefined);

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(200);

        expect(body).toEqual({
          message: "Transaction Success",
        });

        expect(mockedPostCurrentTransaction).toHaveBeenCalledWith(
          expectedCalled,
        );
      });
      it("should return 500 when service throws an error", async () => {
        const { req, expectedCalled } = reRequest();

        mockedPostCurrentTransaction.mockRejectedValue(
          new Error("Internal Server Error"),
        );

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(500);

        expect(body).toEqual({
          message: "Internal Server Error",
        });

        expect(mockedPostCurrentTransaction).toHaveBeenCalledWith(
          expectedCalled,
        );
      });
    });
  });
});

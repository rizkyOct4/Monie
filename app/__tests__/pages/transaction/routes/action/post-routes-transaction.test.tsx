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
import {
  MockPostTransactionForm,
  MockSendPostTransactionForm,
} from "@/app/__mocks__/(pages)/transaction/actions/postTransaction.mock";
import { MockPostFormNewIdTransactionsData } from "@/app/__mocks__/(pages)/transaction/mutation/mutation.post.mock";
import { POSTTransactionsLimit } from "@/_lib/redis";
import {
  MockRedisSuccess,
  MockRedisLimit,
  MockRedisServerFail,
} from "@/app/__mocks__/redis.mock";

// * REDIS
jest.mock("@/_lib/redis", () => ({
  POSTTransactionsLimit: {
    limit: jest.fn(),
  },
}));

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
const MockedRedis = POSTTransactionsLimit.limit as jest.MockedFunction<
  typeof POSTTransactionsLimit.limit
>;
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
  beforeEach(() => {
    jest.clearAllMocks();

    mockedSession.mockResolvedValue({
      publicId: "ss12",
      name: "Asking",
    });
  });

  describe("newPostTransaction", () => {
    const reRequest = () => {
      const req = createPOSTRequest(
        new URLSearchParams({
          key: "newPostTransaction",
        }).toString(),
        {
          ...MockPostFormNewIdTransactionsData,
          date: expect.any(Date),
        },
      );

      const expectedCalled = {
        ...MockPostFormNewIdTransactionsData,
        date: expect.any(Date),
        publicId: "ss12",
      };

      return { req, expectedCalled };
    };
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe("Rate Limit", () => {
      it("should continue request when rate limit is successful", async () => {
        const { req, expectedCalled } = reRequest();
        MockRedisSuccess({ mock: MockedRedis, limit: 5, remaining: 4 });
        mockedPostNewTransaction.mockResolvedValue(undefined);

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(200);

        expect(MockedRedis).toHaveBeenCalledTimes(1);

        expect(MockedRedis).toHaveBeenCalledWith(
          "POST key:newPostTransaction, publicId:ss12",
        );

        expect(mockedPostNewTransaction).toHaveBeenCalledWith(expectedCalled);
      });

      it("should return 429 when rate limit is exceeded", async () => {
        const { req } = reRequest();

        MockRedisLimit({ mock: MockedRedis, limit: 5, remaining: 0 });

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(429);

        expect(body).toEqual({
          message:
            "Too many Requests attempts. Please try again in a few second.",
        });

        expect(res.headers.get("X-RateLimit-Remaining")).toBe("0");

        expect(res.headers.get("X-RateLimit-Reset")).toBe("1750000000");

        // Service tidak boleh dipanggil
        expect(mockedPostNewTransaction).not.toHaveBeenCalled();
      });

      it("should return 500 when Redis throws an error", async () => {
        const { req } = reRequest();

        MockRedisServerFail({ mock: MockedRedis });

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(500);

        expect(body).toEqual({
          message: "Redis connection failed",
        });

        // Service tidak boleh dipanggil
        expect(mockedPostNewTransaction).not.toHaveBeenCalled();
      });
    });

    describe("SERVICES", () => {
      beforeEach(() => {
        // Semua test service harus melewati rate limit
        MockRedisSuccess({ mock: MockedRedis, limit: 5, remaining: 4 });
      });
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
  });

  describe("postTransaction", () => {
    const reRequest = () => {
      const req = createPOSTRequest(
        new URLSearchParams({
          key: "postTransaction",
        }).toString(),
        {
          ...MockSendPostTransactionForm,
          date: String(MockSendPostTransactionForm.date),
        },
      );

      const expectedCalled = {
        ...MockSendPostTransactionForm,
        publicId: "ss12",
      };

      return { req, expectedCalled };
    };

    describe("Rate Limit", () => {
      it("should continue request when rate limit is successful", async () => {
        const { req, expectedCalled } = reRequest();
        MockRedisSuccess({ mock: MockedRedis, limit: 5, remaining: 4 });
        mockedPostCurrentTransaction.mockResolvedValue(undefined);

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(200);

        expect(MockedRedis).toHaveBeenCalledTimes(1);

        expect(MockedRedis).toHaveBeenCalledWith(
          "POST key:postTransaction, publicId:ss12",
        );

        expect(mockedPostCurrentTransaction).toHaveBeenCalledWith(
          expectedCalled,
        );
      });

      it("should return 429 when rate limit is exceeded", async () => {
        const { req } = reRequest();

        MockRedisLimit({ mock: MockedRedis, limit: 5, remaining: 0 });

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(429);

        expect(body).toEqual({
          message:
            "Too many Requests attempts. Please try again in a few second.",
        });

        expect(res.headers.get("X-RateLimit-Remaining")).toBe("0");

        expect(res.headers.get("X-RateLimit-Reset")).toBe("1750000000");

        // Service tidak boleh dipanggil
        expect(mockedPostCurrentTransaction).not.toHaveBeenCalled();
      });

      it("should return 500 when Redis throws an error", async () => {
        const { req } = reRequest();

        MockRedisServerFail({ mock: MockedRedis });

        const res = await POST(req);
        const body = await res.json();

        expect(res.status).toBe(500);

        expect(body).toEqual({
          message: "Redis connection failed",
        });

        // Service tidak boleh dipanggil
        expect(mockedPostCurrentTransaction).not.toHaveBeenCalled();
      });
    });

    describe("SERVICES", () => {
      beforeEach(() => {
        // Semua test service harus melewati rate limit
        MockRedisSuccess({ mock: MockedRedis, limit: 5, remaining: 4 });
      });
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

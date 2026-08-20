/**
 * @jest-environment node
 */

import { PutTransaction } from "@/_lib/services/transaction/action/services-action-transaction-index";
import { NextRequest } from "next/server";
import GetSession from "@/_lib/session";
import { PUT } from "@/app/(pages)/transaction/api/action/route";
import { MockValuePutTransaction } from "@/app/__mocks__/(pages)/transaction/actions/putTransaction.mock";

jest.mock(
  "@/_lib/services/transaction/action/services-action-transaction-index",
  () => ({
    PutTransaction: jest.fn(),
  }),
);

jest.mock("@/_lib/session", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedSession = GetSession as jest.MockedFunction<typeof GetSession>;
const mockedPutTransaction = PutTransaction as jest.MockedFunction<
  typeof PutTransaction
>;

// * MOCK API =========
const createPUTRequest = (query: string, body?: unknown) =>
  new NextRequest(`http://localhost/transaction/api/action?${query}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

describe("PUT /transaction/api/action", () => {
  describe("CASE condition", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      mockedSession.mockResolvedValue({
        publicId: "ss12",
        name: "Asking",
      });

      // ! CHECK JIKA SESSION NULL
    });
    describe("putTransaction", () => {
      const reRequest = () => {
        // ! JSON value !!
        const req = createPUTRequest(new URLSearchParams({
          key: "putTransaction",
        }).toString(), {
          ...MockValuePutTransaction,
          date: String(MockValuePutTransaction.date),
        });

        const expectedCalled = {
          ...MockValuePutTransaction,
          publicId: "ss12",
        };
        return { req, expectedCalled };
      };

      it("should return 200 when success", async () => {
        const { req, expectedCalled } = reRequest();
        mockedPutTransaction.mockResolvedValue(undefined);

        const res = await PUT(req);
        const body = await res.json();

        expect(res.status).toBe(200);

        expect(body).toEqual({
          message: "Update Transaction Success",
        });

        expect(mockedPutTransaction).toHaveBeenCalledWith(expectedCalled);
      });
      it("should return 500 when service throws an error", async () => {
        const { req, expectedCalled } = reRequest();

        mockedPutTransaction.mockRejectedValue(
          new Error("Internal Server Error"),
        );

        const res = await PUT(req);
        const body = await res.json();

        expect(res.status).toBe(500);

        expect(body).toEqual({
          message: "Internal Server Error",
        });

        expect(mockedPutTransaction).toHaveBeenCalledWith(expectedCalled);
      });
    });
  });
});

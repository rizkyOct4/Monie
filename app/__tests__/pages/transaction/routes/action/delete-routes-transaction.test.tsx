/**
 * @jest-environment node
 */

import { DELETE } from "@/app/(pages)/transaction/api/action/route";
import { NextRequest } from "next/server";
import GetSession from "@/_lib/session";
import { DeleteTransaction } from "@/_lib/services/transaction/action/services-action-transaction-index";
import { MockValuesDeleteTransactions } from "@/app/__mocks__/(pages)/transaction/actions/deleteTransaction.mock";

jest.mock(
  "@/_lib/services/transaction/action/services-action-transaction-index",
  () => ({
    DeleteTransaction: jest.fn(),
  }),
);

jest.mock("@/_lib/session", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedSession = GetSession as jest.MockedFunction<typeof GetSession>;
const mockedDeleteTransaction = DeleteTransaction as jest.MockedFunction<
  typeof DeleteTransaction
>;

const createDELETERequest = (query: string, body?: unknown) =>
  new NextRequest(`http://localhost/transaction/api/action?${query}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

describe("DELETE /transaction/api/action", () => {
  describe("CASE conditional", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockedSession.mockResolvedValue({
        publicId: "ss12",
        name: "Asking",
      });
    });

    const reRequest = () => {
      const req = createDELETERequest(
        "key=deleteTransaction",
        MockValuesDeleteTransactions,
      );

      const expectedCalled = {
        publicId: "ss12",
        refId: MockValuesDeleteTransactions.refId,
        id: MockValuesDeleteTransactions.id,
        nominal: MockValuesDeleteTransactions.nominal,
      };
      return { req, expectedCalled };
    };

    it("should return 200 when success", async () => {
      const { req, expectedCalled } = reRequest();
      mockedDeleteTransaction.mockResolvedValue(undefined);

      const res = await DELETE(req);
      const body = await res.json();

      expect(res.status).toBe(200);

      expect(body).toEqual({
        message: "Delete Transaction Success",
      });

      expect(mockedDeleteTransaction).toHaveBeenCalledWith(expectedCalled);
    });
    it("should return 500 when service throws an error", async () => {
      const { req, expectedCalled } = reRequest();

      mockedDeleteTransaction.mockRejectedValue(
        new Error("Internal Server Error"),
      );

      const res = await DELETE(req);
      const body = await res.json();

      expect(res.status).toBe(500);

      expect(body).toEqual({
        message: "Internal Server Error",
      });

      expect(mockedDeleteTransaction).toHaveBeenCalledWith(expectedCalled);
    });
  });
});



// todo DATE =  CLIENT => OBJECT !! => API ROUTE (JSON => string) => SEND INTO SERVER => OBJECT !!!
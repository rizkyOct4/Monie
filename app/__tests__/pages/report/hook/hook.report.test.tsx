import { renderHook } from "@testing-library/react";
import {
  useQueryPeriodTransactions,
  useQueryPeriodIdTransactions,
} from "@/app/(pages)/report/hook/query/query-index";
import { useSessionClient } from "@/_lib/c-session";
import { useHookReport } from "@/app/(pages)/report/hook/hook-index";
import {
  MockUseQueryPeriodTransactions,
  MockUseQueryIdPeriodTransactions,
} from "@/app/__tests__/mocks/(pages)/report/hook/hook.index.mock";

jest.mock("@/_lib/c-session", () => ({
  useSessionClient: jest.fn(),
}));
jest.mock("@/app/(pages)/report/hook/query/query-index", () => ({
  useQueryPeriodTransactions: jest.fn(),
  useQueryPeriodIdTransactions: jest.fn(),
}));

const mockedUseSessionClient = useSessionClient as jest.MockedFunction<
  typeof useSessionClient
>;
const mockedUseQueryPeriodTransactions =
  useQueryPeriodTransactions as jest.MockedFunction<
    typeof useQueryPeriodTransactions
  >;
const mockedUseQueryPeriodIdTransactions =
  useQueryPeriodIdTransactions as jest.MockedFunction<
    typeof useQueryPeriodIdTransactions
  >;

// * DESCRIBE =======
describe("Hook index report", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseSessionClient.mockReturnValue({
      publicId: "ss12",
      name: "Asking",
    });
  });

  it("should return all child values", () => {
    const MockPeriod = MockUseQueryPeriodTransactions();
    const MockIdPeriod = MockUseQueryIdPeriodTransactions();

    mockedUseQueryPeriodTransactions.mockReturnValue(MockPeriod);
    mockedUseQueryPeriodIdTransactions.mockReturnValue(MockIdPeriod);

    const { result } = renderHook(() => useHookReport());

    expect(mockedUseQueryPeriodTransactions).toHaveBeenCalledWith({
      publicId: "ss12",
    });
    expect(mockedUseQueryPeriodIdTransactions).toHaveBeenCalledWith({
      publicId: "ss12",
    });

    // ? result.current -> values return from hook
    expect(result.current).toEqual({
      ...MockPeriod,
      ...MockIdPeriod,
    });
  });
});

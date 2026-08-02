import { render, screen } from "@testing-library/react";
import TransactionProvider from "@/app/(pages)/transaction/context/context";
import { useHookTransaction } from "@/app/(pages)/transaction/hook/hook-index";
import { MockSession } from "@/app/__mocks__/session.mock";
import { useSessionClient } from "@/_lib/c-session";
import { usePathname } from "next/navigation";

const { publicId, name } = MockSession;

jest.mock("@/app/(pages)/transaction/hook/hook-index", () => ({
  useHookTransaction: jest.fn(),
}));

jest.mock("@/_lib/c-session", () => ({
  useSessionClient: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const mockedUseHookTransaction = useHookTransaction as jest.MockedFunction<
  typeof useHookTransaction
>;

const mockedUseSessionClient = useSessionClient as jest.MockedFunction<
  typeof useSessionClient
>;

const mockedUsePathname = usePathname as jest.MockedFunction<
  typeof usePathname
>;

mockedUseSessionClient.mockReturnValue({
  publicId: publicId,
  name: name,
});

mockedUsePathname.mockReturnValue("/");

describe("Context Report Page", () => {
  beforeEach(() => {
    render(
      <TransactionProvider>
        <div role="dialog" aria-label="Child">
          Hello
        </div>
      </TransactionProvider>,
    );

    mockedUseHookTransaction.mockReturnValue({} as any);
  });

  it("send values into children", () => {
    expect(mockedUseHookTransaction).toHaveBeenCalledTimes(1);

    expect(mockedUseHookTransaction).toHaveBeenCalledWith(publicId, "/");

    expect(
      screen.getByRole("dialog", {
        name: "Child",
      }),
    ).toBeInTheDocument();
  });
});

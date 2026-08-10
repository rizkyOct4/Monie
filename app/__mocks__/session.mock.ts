import { useSessionClient } from "@/_lib/c-session";

export const MockSession: { publicId: string; name: string } = {
  publicId: "ss12",
  name: "Asking",
};

// * CLIENT SESSION ======
jest.mock("@/_lib/c-session", () => ({
  useSessionClient: jest.fn(),
}));

const mockedUseSessionClient = useSessionClient as jest.MockedFunction<
  typeof useSessionClient
>;

export const MockUseSessionClient = () => {
  mockedUseSessionClient.mockReturnValue({
    publicId: MockSession.publicId,
    name: MockSession.name,
  });

  return {
    publicId: MockSession.publicId,
    name: MockSession.name,
  };
};

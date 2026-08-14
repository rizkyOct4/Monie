import { render, screen, fireEvent } from "@testing-library/react";
import TransactionProvider from "@/app/(pages)/transaction/context/context";
import NewPostBtn from "@/app/(pages)/components/new-post-btn";
import { useSessionClient } from "@/_lib/c-session";


// ! while used provider its makes everything inside those must be testing!! so do it instead
jest.mock("@/app/(pages)/transaction/context/context", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/_lib/c-session", () => ({
  useSessionClient: jest.fn(),
}));

const mockPropsFormPost = jest.fn();
jest.mock("@/app/(pages)/transaction/components/form/post/options-form-post", () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => {
    mockPropsFormPost({ onClose });

    return (
      <TransactionProvider>
        <div role="dialog" aria-label="New Post">
          <button onClick={onClose} aria-label="Close Dialog">
            Close
          </button>
        </div>
      </TransactionProvider>
    );
  },
}));

const mockedUseSessionClient = useSessionClient as jest.MockedFunction<
  typeof useSessionClient
>;

mockedUseSessionClient.mockReturnValue({
  publicId: "ss12",
  name: "Asking",
});

describe("Render New Post Btn", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<NewPostBtn />);
  });

  it("should open form post comp", () => {
    // ! /new post/ → cari teks "new post"
    // ! i → ignore case (tidak peduli huruf besar/kecil)

    // ! Jadi semua ini akan cocok:

    // ! New Post
    // ! new post
    // ! NEW POST
    // ! NeW PoSt
    fireEvent.click(
      screen.getByRole("button", {
        name: /new-post/i,
      }),
    );

    expect(
      screen.getByRole("dialog", {
        name: "New Post",
      }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Close Dialog",
      }),
    );

    expect(
      screen.queryByRole("dialog", {
        name: "New Post",
      }),
    ).not.toBeInTheDocument();
  });
});

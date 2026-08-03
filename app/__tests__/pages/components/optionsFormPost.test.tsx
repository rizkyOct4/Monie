import { render, screen, fireEvent } from "@testing-library/react";
import OptionsFormPost from "@/app/(pages)/components/options-form-post";

const mockPropsNewTransaction = jest.fn();
jest.mock("@/app/(pages)/components/new-transaction", () => ({
  __esModule: true,
  default: ({
    onClose,
  }: {
    onClose: () => void;
  }) => {
    mockPropsNewTransaction({ onClose });

    return (
      <div role="dialog" aria-label="Mock New Transaction">
        <button onClick={onClose}>Close</button>
      </div>
    );
  },
}));

const mockPropsExistedTransaction = jest.fn();
jest.mock("@/app/(pages)/components/existed-transaction", () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => {
    mockPropsExistedTransaction({ onClose });

    return (
      <div role="dialog" aria-label="Mock Existed Transaction">
        <button onClick={onClose}>Close</button>
      </div>
    );
  },
}));

const mockProps = {
  onClose: jest.fn(),
};

const RenderOptionsFormPost = (props = mockProps) => {
  render(<OptionsFormPost {...props} />);
};

describe("Render Options Form Post", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    RenderOptionsFormPost();
  });

  it("Close Component", () => {
    fireEvent.click(
      screen.getByRole("button", {
        name: "Close Btn",
      }),
    );

    expect(
      screen.queryByRole("dialog", {
        name: "Container Options Form Post",
      }),
    ).not.toBeInTheDocument();
  });

  it("Handler Switch Between New and Existed Transaction", () => {
    // * NEW ====
    expect(
      screen.getByRole("dialog", {
        name: "Mock New Transaction",
      }),
    ).toBeInTheDocument();

    // ? SWITCH INTO EXISTED
    fireEvent.click(
      screen.getByRole("button", {
        name: "Handler Options Btn New",
      }),
    );

    expect(
      screen.getByRole("dialog", {
        name: "Mock Existed Transaction",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("dialog", {
        name: "Mock New Transaction",
      }),
    ).not.toBeInTheDocument();

    // ? SWITCH BACK
    fireEvent.click(
      screen.getByRole("button", {
        name: "Handler Options Btn Existed",
      }),
    );

    expect(
      screen.getByRole("dialog", {
        name: "Mock New Transaction",
      }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("dialog", {
        name: "Mock Existed Transaction",
      }),
    ).not.toBeInTheDocument();
  });
});

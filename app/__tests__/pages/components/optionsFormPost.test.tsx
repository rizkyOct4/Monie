import { render, screen, fireEvent } from "@testing-library/react";
import OptionsFormPost from "@/app/(pages)/components/options-form-post";

const mockPropsNewTransaction = jest.fn();
jest.mock("@/app/(pages)/components/new-transaction", () => ({
  __esModule: true,
  default: ({
    showInfo,
    onInfo,
    onClose,
  }: {
    showInfo: boolean;
    onInfo: () => void;
    onClose: () => void;
  }) => {
    mockPropsNewTransaction({ showInfo, onInfo, onClose });

    return (
      <div role="dialog" aria-label="Mock New Transaction">
        <button onClick={onInfo}>?</button>
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

  it("Open Existed Transaction", () => {
    fireEvent.click(
      screen.getByRole("button", {
        name: "Handler Options Btn Existed",
      }),
    );

    expect(
      screen.getByRole("dialog", {
        name: "Mock Existed Transaction",
      }),
    ).toBeInTheDocument();

    // fireEvent.click(
    //   screen.getByRole("button", {
    //     name: "Close",
    //   }),
    // );

    // expect(
    //   screen.queryByRole("dialog", {
    //     name: "Mock Existed Transaction",
    //   }),
    // ).not.toBeInTheDocument();
  });

//   it("Open New Transaction", () => {
//     fireEvent.click(
//       screen.getByRole("button", {
//         name: "Handler Options Btn New",
//       }),
//     );

//     expect(
//       screen.getByRole("dialog", {
//         name: "Mock New Transaction",
//       }),
//     ).toBeInTheDocument();

//     fireEvent.click(
//       screen.getByRole("button", {
//         name: "Close",
//       }),
//     );

//     expect(
//       screen.queryByRole("dialog", {
//         name: "Mock New Transaction",
//       }),
//     ).not.toBeInTheDocument();
//   });
});



// TODO LOGIC STATENYA BESOK PERBAIKI !!!!
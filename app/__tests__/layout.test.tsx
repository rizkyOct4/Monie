import { render, screen } from "@testing-library/react";
import MainLayout from "../(pages)/layout";

jest.mock("../(pages)/components/footer", () => ({
  __esModule: true,
  default: () => <div role="dialog" aria-label="Footer" />,
}));

jest.mock("../(pages)/components/new-post-btn", () => ({
  __esModule: true,
  default: () => <div role="dialog" aria-label="New Post Btn" />,
}));

describe("MainLayout", () => {
  beforeEach(() => {
    render(
      <MainLayout>
        <div role="dialog" aria-label="Children" />
      </MainLayout>,
    );
  });

  it("renders children", () => {
    expect(
      screen.getByRole("dialog", {
        name: "Children",
      }),
    ).toBeInTheDocument();
  });

  it("renders main element", () => {
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders NewPostBtn", () => {
    expect(
      screen.getByRole("dialog", {
        name: "New Post Btn",
      }),
    ).toBeInTheDocument();
  });

  it("renders Footer", () => {
    expect(
      screen.getByRole("dialog", {
        name: "Footer",
      }),
    ).toBeInTheDocument();
  });
});

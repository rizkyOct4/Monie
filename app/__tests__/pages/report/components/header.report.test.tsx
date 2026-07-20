import { render, screen, fireEvent } from "@testing-library/react";
import HeaderReport from "@/app/(pages)/report/components/header";
import { ReportContext } from "@/app/context/context";
import { useQuery } from "@tanstack/react-query";

// jest.mock("@tanstack/react-query", () => ({
//   ...jest.requireActual("@tanstack/react-query"),
//   useQuery: jest.fn(),
// }));

// const mockedUseQuery = useQuery as jest.Mock;

const mockSetPeriod = jest.fn(); // ? but this is state ???
const mockSetIdPeriod = jest.fn();
const mockIsFetchingPeriodTransaction = jest.fn();

const mockContext = {
  setPeriod: mockSetPeriod,
  setIdPeriod: mockSetIdPeriod,
  isFetchingPeriodTransaction: mockIsFetchingPeriodTransaction,
  PeriodTransactionData: [
    {
      id: "1",
      initialName: "Asking",
    },
  ],
};

const renderHeader = (context = mockContext) =>
  render(
    <ReportContext.Provider value={context}>
      <HeaderReport />
    </ReportContext.Provider>,
  );

describe("HeaderReport", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render header correctly", () => {
    renderHeader();
    const title = screen.getByTestId("title-report");

    expect(screen.getByTestId("header-report")).toBeInTheDocument();

    expect(title).toHaveTextContent("Laporan");
    expect(title).toHaveTextContent("Analisis Keuangan");
  });

  it("should call setPeriod when month changes", () => {
    renderHeader();

    // ? FIND EVENT
    const input = screen.getByTestId("period-input");

    // ? CHANGE EVENT
    fireEvent.change(input, {
      target: {
        value: "2026-07",
      },
    });

    expect(mockSetPeriod).toHaveBeenCalledWith("2026-07");
  });

  it("should open transaction dropdown", () => {
    renderHeader();

    // ? BEFORE OPEN TRANSACTION
    expect(screen.queryByText("Asking")).not.toBeInTheDocument();

    const button = screen.getByTestId("transaction-button");

    // ? OPEN BUTTON
    fireEvent.click(button);

    const context = {
      ...mockContext,
      isFetchingPeriodTransaction: true,
    };

    render(
      <ReportContext.Provider value={context}>
        <HeaderReport />
      </ReportContext.Provider>,
    );

    const loading = screen.getByTestId("loading-transaction");

    expect(loading).toBeInTheDocument();
  });

  // it("should close transaction dropdown and selected id transaction", () => {
  //   // ! why do i have to open that state first ? =====
  //   // ? OPEN
  //   const openButton = screen.getByTestId("transaction-button");
  //   fireEvent.click(openButton);

  //   // ? LOADING ====
  //   const loading = screen.getByTestId("loading-transaction");
  //   expect(loading).toBeInTheDocument();

  //   const parent = screen.getByTestId("transaction-dropdown");
  //   const button = screen.getByTestId("transaction-item-1");

  //   expect(loading).not.toBeInTheDocument();

  //   fireEvent.click(button);

  //   expect(mockSetIdPeriod).toHaveBeenCalledWith("1");

  //   expect(parent).not.toBeInTheDocument();

  //   expect(openButton).toHaveTextContent("Asking");
  // });


  // ! STILL ERROR 
  // it("should close transaction dropdown and selected id transaction", () => {
  //   renderHeader();

  //   // ! why do i have to open that state first ? =====
  //   // ? OPEN
  //   const openButton = screen.getByTestId("transaction-button");
  //   fireEvent.click(openButton);

  //   const parent = screen.getByTestId("transaction-dropdown");
  //   expect(parent).toBeInTheDocument();


  //   const { rerender } = render(
  //     <ReportContext.Provider value={mockContext}>
  //       <HeaderReport />
  //     </ReportContext.Provider>,
  //   );
  //   // ubah context
  //   const newContext = {
  //     ...mockContext,
  //     isFetchingPeriodTransaction: true,
  //   };

  //   rerender(
  //     <ReportContext.Provider value={newContext}>
  //       <HeaderReport />
  //     </ReportContext.Provider>,
  //   );

  //   expect(screen.getByTestId("loading-transaction")).toBeInTheDocument();

  //   const updateContext = {
  //     ...mockContext,
  //     isFetchingPeriodTransaction: false,
  //   };

  //   rerender(
  //     <ReportContext.Provider value={updateContext}>
  //       <HeaderReport />
  //     </ReportContext.Provider>,
  //   );

  //   expect(screen.queryByTestId("loading-transaction")).not.toBeInTheDocument();

  //   const button = screen.getByTestId("transaction-item-1");

  //   fireEvent.click(button);

  //   expect(mockSetIdPeriod).toHaveBeenCalledWith("1");

  //   expect(parent).not.toBeInTheDocument();

  //   expect(openButton).toHaveTextContent("Asking");
  // });
});


// TODO BESOK PAKAI CARA INI !! 
// import { renderHook } from '@testing-library/react-hooks';
// import useServiceConfig from './useServiceConfig';
// import { useIsFetching, useIsMutating, useIsRestoring } from '@tanstack/react-query';

// jest.mock('@tanstack/react-query');

// describe('useServiceConfig', () => {
//     it('should return false when all statuses are negative or false for the default mode', () => {
//         (useIsFetching as jest.Mock).mockReturnValue(0);
//         (useIsMutating as jest.Mock).mockReturnValue(0);
//         (useIsRestoring as jest.Mock).mockReturnValue(false);

//         const { result } = renderHook(() => useServiceConfig());
//         expect(result.current[0]).toBe(false);
//     });

//     it('should return true when fetchingStatus is greater than 0 in "fetching" mode', () => {
//         (useIsFetching as jest.Mock).mockReturnValue(1);
//         (useIsMutating as jest.Mock).mockReturnValue(0);
//         (useIsRestoring as jest.Mock).mockReturnValue(false);

//         const { result } = renderHook(() => useServiceConfig('fetching'));
//         expect(result.current[0]).toBe(true);
//     });

//     it('should return true when mutatingStatus is greater than 0 in "mutating" mode', () => {
//         (useIsFetching as jest.Mock).mockReturnValue(0);
//         (useIsMutating as jest.Mock).mockReturnValue(1);
//         (useIsRestoring as jest.Mock).mockReturnValue(false);

//         const { result } = renderHook(() => useServiceConfig('mutating'));
//         expect(result.current[0]).toBe(true);
//     });

//     it('should return true when restoringStatus is true in "restoring" mode', () => {
//         (useIsFetching as jest.Mock).mockReturnValue(0);
//         (useIsMutating as jest.Mock).mockReturnValue(0);
//         (useIsRestoring as jest.Mock).mockReturnValue(true);

//         const { result } = renderHook(() => useServiceConfig('restoring'));
//         expect(result.current[0]).toBe(true);
//     });

//     it('should return true when any status is positive or true in "all" mode', () => {
//         (useIsFetching as jest.Mock).mockReturnValue(1);
//         (useIsMutating as jest.Mock).mockReturnValue(0);
//         (useIsRestoring as jest.Mock).mockReturnValue(false);

//         const { result } = renderHook(() => useServiceConfig('all'));
//         expect(result.current[0]).toBe(true);
//     });
// });

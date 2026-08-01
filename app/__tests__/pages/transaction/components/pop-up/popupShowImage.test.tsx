import { render, screen, fireEvent } from "@testing-library/react";
import PopUpShowImages from "@/app/(pages)/transaction/components/pop-up/pop-up-show-image";
import { MockTransactionsListData } from "@/app/__tests__/mocks/(pages)/transaction/transaction.mock";

const mockProps = {
  images: MockTransactionsListData[0].images,
  onClose: jest.fn(),
};

const renderPopupShowImages = (props = mockProps) =>
  render(<PopUpShowImages {...props} />);

describe("Render Popup show images", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    renderPopupShowImages();
  });
  it("close btn", () => {
    fireEvent.click(screen.getByTestId("close-popup"));

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("no images", () => {
    const { rerender } = renderPopupShowImages();

    const updateTransactionImagesData = {
      ...mockProps,
      images: [],
    };

    rerender(<PopUpShowImages {...updateTransactionImagesData} />);

    const noImages = screen.getByTestId("no-images");

    expect(noImages).toHaveTextContent("Tidak ada gambar.");
  });

  it("has images", () => {
    mockProps.images.forEach((image) => {
      expect(screen.getByTestId(`has-images-${image.id}`)).toBeInTheDocument();
    });
  });
});

// Jangan gunakan map() untuk assertion

// map() digunakan untuk menghasilkan array baru, bukan untuk melakukan pengecekan.

// Untuk assertion seperti ini, lebih tepat menggunakan:

// forEach() ✅
// for...of ✅
// test.each() ✅

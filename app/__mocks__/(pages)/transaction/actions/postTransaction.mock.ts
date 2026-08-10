import { nanoid } from "nanoid";

export const MockInputMultipleImages = () => {
  const file1 = new File(["image1"], "photo1.png", {
    type: "image/png",
  });

  const file2 = new File(["image2"], "photo2.png", {
    type: "image/png",
  });
  return { file1, file2 };
};

export const MockPostTransactionForm = {
  date: "2026-08-09T14:30",
  images: [
    {
      name: "random-image-1.jpg",
      path: "mock-image-1",
    },
    {
      name: "random-image-2.jpg",
      path: "mock-image-2",
    },
  ],
  information: "Pembelian kebutuhan sehari-hari",
  nominal: 150000,
};

export const MockSendPostTransactionForm = {
  date: new Date("2026-08-09T14:30"),
  images: [
    {
      id: "mock-id",
      imageName: "photo1.png",
      imageId: "random-id-1",
      imageUrl: "random-url-1",
    },
    {
      id: "mock-id",
      imageName: "photo2.png",
      imageId: "random-id-2",
      imageUrl: "random-url-2",
    },
  ],
  information: "Pembelian kebutuhan sehari-hari",
  nominal: 150000,
  id: nanoid(),
  status: "ACTIVE",
  existId: "random-id-1",
  nameTransaction: "janea-1",
};

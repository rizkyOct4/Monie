export const MockPutValueProps = {
  existId: "ss13",
  images: [
    {
      id: "random-1",
      imageName: "random-imageName-1",
      imageUrl: "random-imageUrl-1",
    },
    {
      id: "random-2",
      imageName: "random-imageName-2",
      imageUrl: "random-imageUrl-2",
    },
  ],
  information: "Lorem1",
  nominal: 100000,
  prevDate: new Date("2026-08-08"),
};

export const MockInputMultipleImages = () => {
  const file1 = new File(["image1"], "photo1.png", {
    type: "image/png",
  });

  const file2 = new File(["image2"], "photo2.png", {
    type: "image/png",
  });
  return { file1, file2 };
};

export const MockValuePutTransaction = {
  lastNominal: MockPutValueProps.nominal,
  nominal: 4000,
  images: [
    {
      name: "photo1.png",
      path: expect.any(String),
    },
    {
      name: "photo2.png",
      path: expect.any(String),
    },
  ],
  newImages: [],
  deleteImages: [],
  wrongDate: false,
  existId: "ss13",
  date: new Date("2026-08-07T13:59"),
  information: "Lorem-1333",
};

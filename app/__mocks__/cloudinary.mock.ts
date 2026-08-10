export const MockCloudinaryResponse = [
  {
    public_id: "random-id-1",
    secure_url: "random-url-1",
  },
  {
    public_id: "random-id-2",
    secure_url: "random-url-2",
  },
];

export const MockUploadMultipleToCloudinary = jest.fn();

jest.mock("@/_utils/direct-upload-cloud", () => ({
  uploadMultipleToCloudinary: jest.fn(
    ({
      files,
      publicId,
      type,
      id,
    }: {
      files: string[];
      publicId: string;
      type: "images";
      id: string;
    }) => {
      MockUploadMultipleToCloudinary({
        files,
        publicId,
        type,
        id,
      });

      return Promise.resolve(MockCloudinaryResponse);
    },
  ),
}));

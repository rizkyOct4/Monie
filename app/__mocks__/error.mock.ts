export const MockError = () => {
  const error = new Error("Server Error!");

  const RejectedMock = jest.fn().mockRejectedValue(error); // ! created MOCK FUNCTION which is return ERROR !!

  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  return { RejectedMock, consoleSpy, error };
};

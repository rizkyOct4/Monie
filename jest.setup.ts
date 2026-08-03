import "@testing-library/jest-dom";
// import 'whatwg-fetch'
// import { serverMockReport } from './app/mocks/server'

jest.mock("nanoid", () => ({
  nanoid: () => "mock-id",
  publicId: () => "mock-id",
}));

jest.mock("session", () => ({
  publicId: () => "ss12",
  name: () => "asking",
}));



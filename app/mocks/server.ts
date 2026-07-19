import { setupServer } from "msw/node";
import { MOCK_REPORT_API } from "./(pages)/report/api-handler";

export const serverMockReport = setupServer(...MOCK_REPORT_API);

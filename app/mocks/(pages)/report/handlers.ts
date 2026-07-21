import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  http.get('/report/api?key=periodTransactions&month=7&year=2026', async () => {
    // Delays the response so the test can catch the fetching state
    await delay(150); 
    return HttpResponse.json({ message: "Wait" });
  }),
];

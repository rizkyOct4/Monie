import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// * AUTH ===============
export const POSTRegister = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(2, "20 m"),
  analytics: true,
});

// * TRANSACTIONS ===============
export const GETTransactionsLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(20, "30 s"),
  analytics: true,
});

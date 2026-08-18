import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(2, "20 m"),
  analytics: true,
});


export const GETTransactionsLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(20, "30 s"),
  analytics: true,
});

type TRedisProps = {
  mock: any;
  limit?: number;
  remaining?: number;
};

export const MockRedisSuccess = ({ mock, limit, remaining }: TRedisProps) => {
  mock.mockResolvedValue({
    limit: limit,
    remaining: remaining,
    reset: 1750000000,
    success: true,
    pending: Promise.resolve(),
  });
};

export const MockRedisLimit = ({ mock, limit, remaining }: TRedisProps) => {
  mock.mockResolvedValue({
    limit: limit,
    remaining: remaining,
    reset: 1750000000,
    success: false,
    pending: Promise.resolve(),
  });
};

export const MockRedisServerFail = ({ mock }: TRedisProps) => {
  mock.mockRejectedValue(new Error("Redis connection failed"));
};

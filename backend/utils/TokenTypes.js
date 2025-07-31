export const TOKEN_TYPES = {
  refresh: {
    key: process.env.REFRESH_TOKEN_SECRET ?? "secret",
    expiresIn: "7d",
  },
  access: {
    key: process.env.ACCESS_TOKEN_SECRET ?? "secret",
    expiresIn: "15m",
  },
};

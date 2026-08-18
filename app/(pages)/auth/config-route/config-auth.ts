export const ROUTES_AUTH = (key?: string) => {
  switch (key) {
    case "register":
      return `/auth/api?key=${key}`;
    default:
      return "";
  }
};

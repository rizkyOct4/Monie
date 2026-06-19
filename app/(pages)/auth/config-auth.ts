// import { BASE_URL } from "@/_lib/config";

export const CONFIG_AUTH = (key?: string) => {
  switch (key) {
    case "register":
      return `/auth/api?key=${key}`;
    default:
      return "";
  }
};

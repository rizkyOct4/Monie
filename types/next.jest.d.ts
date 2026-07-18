declare module "next/jest" {
  import type { Config } from "jest";

  export default function nextJest(options: {
    dir: string;
  }): (config: Config) => Config;
}
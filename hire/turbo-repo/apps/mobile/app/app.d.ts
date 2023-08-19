/// <reference types="nativewind/types" />

declare global {
  namespace NodeJs {
    export interface ProcessEnv {
      NODE_ENV: "dev" | "prod";
    }
  }
}

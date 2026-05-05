import { createServerFn } from "@tanstack/react-start";
import rawData from "./data.json";

export const getData = createServerFn({ method: "GET" })
  .handler(async () => {
    return rawData;

  })

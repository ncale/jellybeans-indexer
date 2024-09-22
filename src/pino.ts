import pino from "pino";
export const logger = pino({
  //   level: "trace",
  level: "info",
  transport: {
    target: "pino-pretty",
  },
});

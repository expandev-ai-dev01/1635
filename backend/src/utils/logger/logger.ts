/* eslint-disable no-console */

// A simple logger implementation. For production, consider using a more robust library like Winston or Pino.

const getTimestamp = (): string => new Date().toISOString();

export const logger = {
  info: (message: string, ...args: any[]): void => {
    console.log(`[INFO] ${getTimestamp()} - ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]): void => {
    console.warn(`[WARN] ${getTimestamp()} - ${message}`, ...args);
  },
  error: (message: string, ...args: any[]): void => {
    console.error(`[ERROR] ${getTimestamp()} - ${message}`, ...args);
  },
  debug: (message: string, ...args: any[]): void => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${getTimestamp()} - ${message}`, ...args);
    }
  },
};

/**
 * Structured Logger for PRIME UB 2027 Backend
 *
 * - Production: JSON output (parseable by Vercel Logs, Datadog, etc.)
 * - Development: Colored, human-readable output
 * - Supports child loggers with request ID context
 *
 * Usage:
 *   import { logger } from '@backend/lib/logger';
 *   logger.info('Server started');
 *   logger.error('Something failed', { error: err.message });
 *
 *   // With request context
 *   const reqLogger = logger.child({ requestId: 'abc-123' });
 *   reqLogger.info('Processing request');
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// ANSI color codes for development output
const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  bold: '\x1b[1m',
} as const;

const LEVEL_COLORS: Record<LogLevel, string> = {
  debug: COLORS.dim,
  info: COLORS.green,
  warn: COLORS.yellow,
  error: COLORS.red,
};

const LEVEL_LABELS: Record<LogLevel, string> = {
  debug: 'DBG',
  info: 'INF',
  warn: 'WRN',
  error: 'ERR',
};

class Logger {
  private baseContext: LogContext;
  private minLevel: LogLevel;
  private isProduction: boolean;

  constructor(context: LogContext = {}) {
    this.baseContext = context;
    this.isProduction = process.env.NODE_ENV === 'production';
    this.minLevel = this.isProduction ? 'info' : 'debug';
  }

  /**
   * Create a child logger with additional context.
   * Useful for adding request ID, module name, etc.
   */
  child(context: LogContext): Logger {
    const childLogger = new Logger({
      ...this.baseContext,
      ...context,
    });
    return childLogger;
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log('error', message, context);
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (LOG_LEVEL_PRIORITY[level] < LOG_LEVEL_PRIORITY[this.minLevel]) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: {
        ...this.baseContext,
        ...context,
      },
    };

    // Clean up empty context
    if (entry.context && Object.keys(entry.context).length === 0) {
      delete entry.context;
    }

    if (this.isProduction) {
      this.writeJson(entry);
    } else {
      this.writePretty(entry);
    }
  }

  /** Production: single-line JSON for log aggregation services */
  private writeJson(entry: LogEntry): void {
    const output = JSON.stringify(entry);
    const consoleFn = entry.level === 'error' ? console.error
      : entry.level === 'warn' ? console.warn
      : console.log;
    consoleFn(output);
  }

  /** Development: colored, human-readable format */
  private writePretty(entry: LogEntry): void {
    const color = LEVEL_COLORS[entry.level];
    const label = LEVEL_LABELS[entry.level];
    const time = new Date(entry.timestamp).toLocaleTimeString('en-US', { hour12: false });

    let line = `${COLORS.dim}${time}${COLORS.reset} ${color}${COLORS.bold}${label}${COLORS.reset} ${entry.message}`;

    if (entry.context && Object.keys(entry.context).length > 0) {
      const contextStr = Object.entries(entry.context)
        .map(([key, value]) => {
          const displayValue = typeof value === 'object'
            ? JSON.stringify(value)
            : String(value);
          return `${COLORS.cyan}${key}${COLORS.reset}=${displayValue}`;
        })
        .join(' ');
      line += ` ${contextStr}`;
    }

    const consoleFn = entry.level === 'error' ? console.error
      : entry.level === 'warn' ? console.warn
      : console.log;
    consoleFn(line);
  }
}

/** Singleton logger instance for the application */
export const logger = new Logger();

export { Logger, type LogLevel, type LogContext };

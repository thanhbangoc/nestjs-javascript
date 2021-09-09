import { Injectable } from '@nestjs/common';
import ConsoleOutput from './console.output';
import FileOutput from './file.output';
import clc from 'cli-color';
import config from './config';

const LOG_LEVELS = ['log', 'error', 'warn', 'debug', 'verbose'];
const LOG_OUTPUT = config.logOutput; // read from config
const logLevels = config.logLevels || LOG_LEVELS;

@Injectable()
export class LoggerService {
  constructor() {
    // by default, it will log to the console
    this.setLoggerOutput();
  }

  setContext(context) {
    this.context = context;
  }

  setLoggerOutput() {
    switch (LOG_OUTPUT) {
      case 'file':
        this.logger = new FileOutput();
        break;
      default:
        this.logger = new ConsoleOutput();
        break;
    }
  }

  isLogLevelEnabled(level) {
    return (logLevels instanceof Array) && logLevels.includes(level);
  }

  error(message, trace = '', context) {
    this.printMessage('Error', message, context, clc.red);
    this.printStackTrace('Error',trace);
  }

  log(message, context) {
    this.printMessage('Log', message, context, clc.green);
  }

  warn(message, context) {
    this.printMessage('Warn', message, context, clc.yellow);
  }

  debug(message, context) {
    this.printMessage('Debug', message, context, clc.magentaBright);
  }

  verbose(message, context) {
    this.printMessage('Verbose', message, context, clc.cyanBright);
  }

  printMessage(logLevel, message, context, color) {
    if (this.isLogLevelEnabled(logLevel.toLowerCase())) {
      const localeStringOptions = {
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        day: '2-digit',
        month: '2-digit',
      };
      const timestamp = new Date(Date.now()).toLocaleString(
        undefined,
        localeStringOptions,
      );
      const ctx = context ? context : this.context;

      logLevel = logLevel.concat(' '.repeat(7 - logLevel.length));
      this.logger.printMessage(logLevel, timestamp, message, ctx, color);
    }
  }

  printStackTrace(logLevel,trace) {
    if (!trace || !this.isLogLevelEnabled(logLevel.toLowerCase())) {
      return;
    }
    this.logger.printStackTrace(trace);
  }
}

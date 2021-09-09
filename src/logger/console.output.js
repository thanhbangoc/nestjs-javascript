import clc from 'cli-color';

const yellow = clc.xterm(3);

export default class ConsoleOutput {
  printMessage(logLevel, timestamp, message, context, color) {
    const isObject =
      message !== undefined && message !== null && typeof message == 'object';
    let output;
    if (message instanceof Error) {
      output = `${message.stack}`;
    } else {
      output = isObject ? `${JSON.stringify(message)}` : `${color(message)}`;
    }

    const contextMessage = context ? yellow(`[${context}] `) : '';
    logLevel = color(`${logLevel}`);

    process.stdout.write(
      `${logLevel} ${timestamp} ${contextMessage}\n\t${output}\n`,
    );
  }

  printStackTrace(trace) {
    process.stdout.write(`${trace}\n`);
  }
}

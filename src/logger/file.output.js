const fs = require('fs');
const path = require('path');
const config = require('./config');

const fileName = config.file.fileName || 'events';
const fileExtension = '.log';
const logDir = config.file.logDir || '../../logs';
const fileSize = config.file.maxSize || 1024 * 1024; // bytes
const filePath = path.join(__dirname, logDir, fileName + fileExtension);

export default class FileOuput {
  printMessage(logLevel, timestamp, message, context) {
    const isObject =
      message !== undefined && message !== null && typeof message == 'object';

    if (message instanceof Error) {
      message = `${message.stack}`;
    } else {
      message = isObject ? `${JSON.stringify(message)}` : message;
    }

    const msg = `${logLevel} ${timestamp} ${context}\n\t${message}`;

    let dirName = path.dirname(filePath);
    let existPath = fs.existsSync(dirName);

    // folder exist
    if (existPath) {
      //if the logfile doesn't exist, then create new file
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, msg);
      } else {
        this.appendLog(msg);
      }
    } else {
      // create folder if is not exist
      fs.mkdirSync(dirName);
      fs.writeFileSync(filePath, msg);
    }
  }

  appendLog(msg) {
    let logFile = fs.statSync(filePath);
    let fileSizeInBytes = logFile['size'];

    if (fileSizeInBytes > fileSize) {
      // clone backup file
      let backupFileName =
        fileName.split('.')[0] + '_' + this.getCurrentTimeFormat();
      let dirName = path.dirname(filePath);
      let backupFilePath = path.join(dirName, backupFileName + fileExtension);

      fs.renameSync(filePath, backupFilePath);
      // reset current log file
      fs.writeFileSync(filePath, msg);
    } else {
      fs.appendFileSync(filePath, '\n' + msg);
    }
  }

  printStackTrace(trace) {
    fs.appendFileSync(filePath, `\n\t${trace}`);
  }

  getCurrentTimeFormat() {
    let currentTime = new Date();
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth() + 1; // "+ 1" becouse the 1st month is 0
    let date = currentTime.getDate();
    let hour = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    return `${year}${month}${date}${hour}${minutes}${seconds}`;
  }
}

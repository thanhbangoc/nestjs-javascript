module.exports = {
  logOutput: 'console', // console or file
  logLevels:['warn','log','error'], // ['log', 'error', 'warn', 'debug', 'verbose']
  file: {
    logDir: '../../logs',
    fileName: 'events',
    maxSize: 1024 * 1024, // bytes
  },
};

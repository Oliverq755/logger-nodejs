const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, json } = format;

require('winston-daily-rotate-file');

let nowDate = new Date();
let current_date = nowDate.getDate() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getFullYear();
let transportError = new (winston.transports.DailyRotateFile)({
  filename: 'logs/error/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  // maxSize: '20m',
  level: "error",
  maxFiles: '90d'
});

let transportCombined = new (winston.transports.DailyRotateFile)({
  filename: 'logs/combined/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  level: "debug",
  // maxSize: '20m',
  maxFiles: '90d'
});

const logger = createLogger({
  defaultMeta: { 'SC': 'GKB' },
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    transportError,
    transportCombined
  ]
});

module.exports = logger;

var path = require('path');


var winston = require('winston');
var expressWinston = require('express-winston');
require('winston-daily-rotate-file');

// expressWinston.bodyBlacklist.push('trace', 'secretproperty');
expressWinston.requestWhitelist.push('body');

module.exports.infoLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile(
      {
        filename: "log/infolog%DATE%.log",
        datePattern: 'DD-MM-YYYY',
        maxSize: '20m'
      }
    )
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
    
  ), colorize: true, prettyPrint: true
  //  msg: "HTTP {{req.method}} {{req.url}}"
});


module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile(
      {
        filename: "log/errorlog%DATE%.log",
        datePattern: 'DD-MM-YYYY',
        maxSize: '20m'
      }
    )
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.errors({ stack: false })
  )
});



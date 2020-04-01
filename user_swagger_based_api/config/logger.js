const winston = require('winston');

exports.logger = winston.createLogger({
    level: 'info',
    transports: [
        new (winston.transports.File)({ filename: 'common.log' }),
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(info => {
            return `${info.timestamp} - ${info.level}: ${info.message}`;
        }))
});

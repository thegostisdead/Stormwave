const winston = require("winston");

const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const CATEGORY = "backend";
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});


const logger = winston.createLogger({
    level: "debug",
    format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
    transports: [new winston.transports.Console()],
});

module.exports = logger;
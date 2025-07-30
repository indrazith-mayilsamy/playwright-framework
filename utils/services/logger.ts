import fs from 'fs';
import path from 'path';

const LOGLEVEL = {
    INFO: "INFO",
    WARN: "WARN",
    ERROR: "ERROR",
};

function getTimestamp() {
    return new Date().toISOString().slice(0, -1);
};

/**
 * Logs a message to a file and console with a timestamp.
 * @param fileName Name of the log file.
 * @param level Level of the log (INFO, WARN, ERROR).
 * @param message Content of the log message.
 */
async function logMessage(fileName: string, level: string, message: string) {
    const timestamp = getTimestamp();
    const formattedMessage = `[${timestamp}] [${level}] Logs - ${message} \n`;
    fs.appendFileSync(fileName, formattedMessage, 'utf-8');
    console.log(formattedMessage);
};


export class Logger {
    private static logFilePath = path.join(process.cwd(), 'execution-log/test-steps.logs');
    /**
     * Ensures the log file exists, creating directories if necessary.
     */
    private static ensureFileExists() {
        if(!fs.existsSync(this.logFilePath)) {
            fs.mkdirSync(path.dirname(this.logFilePath), { recursive: true });
            fs.writeFileSync(this.logFilePath, '', 'utf-8');
        }
    };

    /**
     * Info logs a message with INFO level.
     * @param message Message to log with INFO level.
     * @returns content of the log file.
     */
    static info(message: string) {
        this.ensureFileExists();
        return logMessage(this.logFilePath, LOGLEVEL.INFO, message);
    };

    /**
     * Warn logs a message with WARN level.
     * @param message Message to log with INFO level.
     * @returns content of the log file.
     */
    static warn(message: string) {
        this.ensureFileExists();
        return logMessage(this.logFilePath, LOGLEVEL.WARN, message);
    }

    /**
     * Error logs a message with ERROR level.
     * @param message Message to log with ERROR level.
     * @returns content of the log file.
     */
    static error(message: string) {
        this.ensureFileExists();
        return logMessage(this.logFilePath, LOGLEVEL.ERROR, message);
    };

    /**
     * Adds a line break to the log file.
     * @param count Number of line breaks to add (default is 1).
     */
    static addLineBreaks(count: number = 1) {
        this.ensureFileExists();
        const lineBreak = '\n'.repeat(count);
        fs.appendFileSync(this.logFilePath, lineBreak, 'utf-8');
        console.log(lineBreak);
    }
};
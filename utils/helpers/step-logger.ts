import * as path from "path";
import * as fs from "fs";
import { getCurrentTime } from "./common-services";
import { Configuration } from "./env-configuration";

/**
 *
 * @enum {string}
 */
const LOGLEVEL = {
  INFO: "Info",
  ERROR: "Error",
};

export class Logger {
  private static logFilePath = path.resolve(
    process.cwd(),
    "test-results/executionSteps.log"
  );

  private static async log(level: string, message: string) {
    const timeStamp = await getCurrentTime();
    const formattedMessage = `[${timeStamp}] [${level}] - ${message}\n`;

    const logDir = path.dirname(this.logFilePath);

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fs.appendFileSync(this.logFilePath, formattedMessage);

    if (Configuration.get("PRINTLOG").toLowerCase() === "true") {
      console.log(formattedMessage);
    }
  }

  static info(message: string) {
    this.log(LOGLEVEL.INFO, message);
  }

  static error(message: string) {
    this.log(LOGLEVEL.ERROR, message);
    throw new Error(message);
  }
}

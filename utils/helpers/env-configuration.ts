import * as path from "path";
import * as fs from "fs";
import * as dotenv from "dotenv";

export class Configuration {
  static get(key: string): string {
    return process.env[key] || "";
  }

  static set(key: string, value: string): void {
    process.env[key] = value;
  }

  static loadEnv() {
    let envPath = path.resolve(process.cwd(), ".env");

    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath });
    } else {
      throw new Error(`Environment file not found at ${envPath}`);
    }
  }
}

Configuration.loadEnv();

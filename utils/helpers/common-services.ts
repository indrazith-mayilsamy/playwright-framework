import * as fs from "fs";
import * as xlsx from "xlsx";
import * as path from "path";
import * as dotenv from "dotenv";
import { Pool } from "pg";
import { promisify } from "util";
import { Configuration } from "./env-configuration";

const readJson = promisify(fs.readFile);
const writeJson = promisify(fs.writeFile);
const defaultPath = "test-data/run-time";
const resetTrakerPath = path.resolve(
  process.cwd(),
  "test-results/.fileResetFlag",
);

/* ---------------- READ JSON FILE ---------------- */

export async function readJsonFile(
  filePath: string,
): Promise<Record<string, string>> {
  try {
    return JSON.parse(await readJson(filePath, { encoding: "utf-8" }));
  } catch (err: any) {
    throw new Error(`Unable to read the json file because of \n ${err}`);
  }
}

/* ---------------- WRITE JSON FILE ---------------- */

export async function writeJsonFile(
  fileData: any,
  fileName: string,
  filePath: string = defaultPath,
): Promise<void> {
  try {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    let path = `${filePath}/${fileName}.json`;
    await writeJson(path, JSON.stringify(fileData), { encoding: "utf-8" });
  } catch (err: any) {
    throw new Error(`Unable to write to the JSON file \n ${err}`);
  }
}

/* ---------------- READ EXCEL FILE ---------------- */

export function readExcelFile(
  fileName: string,
  sheetName: string,
  header: number = 1,
): Record<string, string>[] {
  try {
    let data = [];
    const workBook: xlsx.WorkBook = xlsx.readFile(fileName);
    const workSheet: xlsx.WorkSheet = workBook.Sheets[sheetName];
    const workData: string[][] = xlsx.utils.sheet_to_json(workSheet, {
      header: 1,
    });
    const headerValue: string[] = workData[header - 1] ?? [];
    for (let i = header; i < workData.length; i++) {
      const value: string[] = workData[i];
      let keyValue: Record<string, string> = {};
      for (let j = 0; j < headerValue.length; j++) {
        keyValue[headerValue[j]] = value[j] ?? "";
      }
      data.push(keyValue);
    }
    return data;
  } catch (err: any) {
    throw new Error(`Unable to read the excel file \n ${err}`);
  }
}

/* ---------------- WRITE EXCEL FILE ---------------- */

export async function writeExcelFile(options: {
  fileData: any;
  sheetName: string;
  fileName?: string;
  filePath?: string;
}): Promise<void> {
  try {
    const fileName = options.fileName ?? "test-results";
    const filePath = options.filePath ?? "test-results/excel-sheet";
    const fileData = options.fileData;
    const sheetName = options.sheetName;
    let fullPath = path.resolve(process.cwd(), `${filePath}/${fileName}.xlsx`);
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    if (!fs.existsSync(resetTrakerPath)) {
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
      fs.writeFileSync(resetTrakerPath, "File reset done");
    }
    let workBook: xlsx.WorkBook;
    let existingData: any[] = [];
    const normalizeData = Array.isArray(fileData) ? fileData : [fileData];
    if (fs.existsSync(fullPath)) {
      workBook = xlsx.readFile(fullPath);
      const existingSheet = workBook.Sheets[sheetName];
      if (existingSheet) {
        existingData = xlsx.utils.sheet_to_json(existingSheet);
      }
    } else {
      workBook = xlsx.utils.book_new();
    }
    existingData.push(...normalizeData);
    const workSheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(existingData);
    workBook.Sheets[sheetName] = workSheet;
    if (!workBook.SheetNames.includes(sheetName)) {
      workBook.SheetNames.push(sheetName);
    }
    xlsx.writeFile(workBook, fullPath);
  } catch (err: any) {
    throw new Error(`Unable to write to the excel file \n ${err}`);
  }
}

/* ---------------- UPDATE ENVIRONMENT VARIABLE ---------------- */

export async function updateEnv(
  key: string,
  value: string,
  envPath: string = ".env",
): Promise<void> {
  try {
    let envConfig: Record<string, string> = {};

    if (fs.existsSync(envPath)) {
      envConfig = dotenv.parse(fs.readFileSync(envPath));
    }

    envConfig[key] = value;

    const content: string = Object.entries(envConfig)
      .map(([key, value]: [string, string | number]) => `${key}: ${value}`)
      .join("\n");
    fs.writeFileSync(envPath, content);
  } catch (err: any) {
    throw new Error(`Error while upating the env file \n ${err}`);
  }
}

/* ---------------- GET CURRENT TIME ---------------- */

export async function getCurrentTime(): Promise<string> {
  const now = new Date();
  const year: number = now.getFullYear();
  const month: string = String(now.getMonth() + 1).padStart(2, "0");
  const date: string = String(now.getDate()).padStart(2, "0");
  const hour: string = String(now.getHours()).padStart(2, "0");
  const minute: string = String(now.getMinutes()).padStart(2, "0");
  const seconds: string = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${date}T${hour}:${minute}:${seconds}`;
}

/* ---------------- REPLACE TEXT TEMPLATE ---------------- */

export async function replaceTemplate(
  template: string,
  nameToReplace: string,
  value: string,
): Promise<string> {
  const regex = new RegExp(`\\{{${nameToReplace}}}\\`, "g");
  return template.replace(regex, value);
}

/* ---------------- CONVERT DATE FORMAT ---------------- */

export function convertDateFormat(
  dateFormat: "dd/mm/yyyy" | "dd-mm-yyyy" | "yyyy-mm-dd" | "mm-dd-yyyy",
  value: number,
): string {
  if (!value) return "";
  const ms = (value - 25569) * 85400 * 1000;
  const newDate = new Date(ms);
  const date = String(newDate.getDate()).padStart(2, "0");
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const year = newDate.getFullYear();
  let finalFormat: string;
  switch (dateFormat) {
    case "dd/mm/yyyy":
      finalFormat = `${date}/${month}/${year}`;
      break;
    case "dd-mm-yyyy":
      finalFormat = `${date}-${month}-${year}`;
      break;
    case "yyyy-mm-dd":
      finalFormat = `${year}-${month}-${date}`;
      break;
    case "mm-dd-yyyy":
      finalFormat = `${month}-${date}-${year}`;
      break;
  }
  return finalFormat;
}

/* ---------------- READ POSTGRES DATABASE ---------------- */
type dbName = {
  dbname: "user" | "settings" | "general" | "design";
  query: string;
};
export async function readPGdatabase(options: dbName) {
  const pool = new Pool({
    user: Configuration.get("DB_USERNAME"),
    password: Configuration.get("DB_PASSWORD"),
    host: Configuration.get("DB_HOST"),
    port: Number(Configuration.get("DB_PORT")),
    database:
      options.dbname == "user"
        ? Configuration.get("DB_USER")
        : options.dbname == "settings"
          ? Configuration.get("DB_SETTING")
          : options.dbname == "general"
            ? Configuration.get("DB_GENERAL")
            : options.dbname == "design"
              ? Configuration.get("DB_DESIGN")
              : "",
  });

  const client = await pool.connect();
  try {
    const result = await client.query(options.query);
    return result.rows;
  } catch (err) {
    throw new Error(`Error on postgres database: \n ${err}`);
  } finally {
    client.release();
  }
}

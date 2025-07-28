import fs, { existsSync } from "fs"
import xlsx from "xlsx"
import path from "path"

let defaultPath = path.join(process.cwd(), "data/run-time")

/**
 * Writes JSON data to a file in the specified directory.
 *
 * @param fileData - The data to be written (any JSON-serializable object).
 * @param fileName - The name of the file (without extension).
 * @param filePath - Optional path where the file should be written. Defaults to `data/run-time`.
 * @returns The full path of the written file.
 * @throws If writing fails, throws an Error with details.
 */
export async function JSONWriter(fileData: any, fileName: string, filePath?: string) {
    try {
        const folderPath = filePath || defaultPath;
        const fullPath = path.join(folderPath, `${fileName}.json`);

        if (!existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        await fs.promises.writeFile(fullPath, JSON.stringify(fileData, null, 2), 'utf-8');
        return fullPath;
    } catch (error: any) {
        throw new Error(`Error while writing the JSON file: \n ${error.message}`);
    }
};

/**
 * Reads and parses a JSON file from the specified directory.
 *
 * @param filePath - Full path to the JSON file (including filename and `.json` extension).
 * @returns Parsed JSON content.
 * @throws If reading or parsing fails.
 */
export async function JSONReader(filePath: string) {
    try {
        const content = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(content)
    } catch (error: any) {
        throw new Error(`Error while reading the JSON file: \n ${error.message}`);
    }
};

/**
 * Reads data from an Excel sheet and maps each row to a key-value object using header row.
 *
 * @param file - Full path to the Excel file.
 * @param sheet - Sheet name to read.
 * @param header - Row number (1-based) that contains the headers.
 * @returns Array of row objects where keys come from the header row.
 */
export async function excelReaderSingleSheet(file: string, sheet: string, header: number = 1) {
    try {
        let resultData: Record<string, string>[] = [];

        const workBook: xlsx.WorkBook = xlsx.readFile(file);
        const workSheet: xlsx.WorkSheet = workBook.Sheets[sheet];

        if (!workSheet) {
            throw new Error(`Sheet "${sheet}" not found in file "${file}"`);
        }

        const workData: string[][] = xlsx.utils.sheet_to_json(workSheet, { header: 1 });
        const keys: string[] = workData[header - 1] || [];

        for (let i = header; i < workData.length; i++) {
            const value: string[] = workData[i];
            const keyValueMap: Record<string, string> = {};

            for (let j = 0; j < keys.length; j++) {
                keyValueMap[keys[j]] = value[j] ?? '';
            }

            resultData.push(keyValueMap);
        }

        return resultData;
    } catch (error: any) {
        throw new Error(`Error while reading the excel file: \n ${error.message}`);
    }
};


/**
 * Reads multiple sheets from an Excel file with different header rows per sheet.
 *
 * @param file - Full path to the Excel file.
 * @param headersBySheet - Object mapping sheet names to their 1-based header row number.
 * @returns An object where keys are sheet names and values are arrays of row objects.
 */
export async function excelReaderAllSheets(file: string, headerBySheet: Record<string, number> = {}) {
    try {
        const resultData: Record<string, Record<string, string>[]> = {};
        const workBook: xlsx.WorkBook = xlsx.readFile(file);
        const sheetNames = workBook.SheetNames;

        for (const sheet of sheetNames) {
            const headerRow: number = headerBySheet[sheet] ?? 1;
            const workSheet: xlsx.WorkSheet = workBook.Sheets[sheet];
            const workData: string[][] = xlsx.utils.sheet_to_json(workSheet, { header: 1 });
            const key: string[] = workData[headerRow - 1] || [];
            const sheetData = [];

            for (let i = headerRow; i < workData.length; i++) {
                const value: string[] = workData[i];
                const mapKeyValue: Record<string, string> = {};
                for (let j = 0; j < key.length; j++) {
                    mapKeyValue[key[j]] = value[j];
                }
                sheetData.push(mapKeyValue);
            };
            resultData[sheet] = sheetData;
        };
        return resultData;
    } catch (error: any) {
        throw new Error(`Error while reading the excel file: ${error.message}`);
    }
};

/**
 * Validates an email address format.
 *
 * @param email - The email address to validate.
 * @returns true if the email is valid, false otherwise.
 * @throws If validation fails, throws an Error with details.
 */
export async function emailVefification(email: string) {
    try {
        if (!email) return false;
        const hasValidLength = email.length >= 5 && email.length <= 254;
        const hasAtSymbol = email.includes('@');
        const hasDot = email.includes('.');
        const onlyOneAtSymbol = email.split('@').length === 2;
        const hasValidStartEnd = !email.startsWith('.') && !email.endsWith('.') && !email.startsWith('@') && !email.endsWith('@');
        const atBeforeDot = email.indexOf('@') < email.lastIndexOf('.');
        const hasConsecutiveDots = !email.includes('..');
        const invalidDotafterAt = email.includes('@.') || email.includes('.@');
        const hasValidFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        const maxConsecutiveDots = email.split('.').length - 1 <= 3;
        return hasValidLength && hasAtSymbol && hasDot && onlyOneAtSymbol && hasValidStartEnd && atBeforeDot && hasConsecutiveDots && !invalidDotafterAt && hasValidFormat && maxConsecutiveDots;
    } catch (error: any) {
        throw new Error(`Email verification failed: ${error.message}`);
    };
};

/**
 * Validates a string to ensure it does not contain numbers or special characters.
 *
 * @param str - The string to validate.
 * @returns true if the string is valid, false otherwise.
 * @throws If validation fails, throws an Error with details.
 */
export async function toEnsureNoNumberAndSpecialChar(str: string) {
    try {
        if (!str) return false;
        const hasNoNumbers = !/\d/.test(str);
        const hasNoSpecialChars = /^(?![\.\-_])([a-zA-Z\s\-_]+)(?<![\.\-_])$/.test(str);
        const noInvalidStartOrEnd = !/^[._-]/.test(str) && !/[._-]$/.test(str);
        const noConsecutiveSpecials = !/([._-])\1+/.test(str);
        return hasNoNumbers && hasNoSpecialChars && noInvalidStartOrEnd && noConsecutiveSpecials;
    } catch (error: any) {
        throw new Error(`Validation failed: ${error.message}`);
    }
}

/**
 * Converts a string representation of an array into an actual array.
 *
 * @param value - The string to convert, expected to be in JSON array format (e.g., "[1, 2, 3]").
 * @returns The parsed array.
 * @throws If the string is not a valid JSON array, throws an Error with details.
 */
async function convertStringToArray(value: string) {
    const trimmedValue = value.trim();
    const isArray = trimmedValue.startsWith('[') && trimmedValue.endsWith(']');
    if (isArray) {
        try {
            return JSON.parse(trimmedValue);
        } catch (error: any) {
            throw new Error(`Invalid JSON array format: ${error.message}`);
        }
    };
};
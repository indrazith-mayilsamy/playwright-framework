import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

export class Configuration {

    static Environment: string = "";
    static EmailReceivers: string = "";
    static SenderEmail: string = "";
    static SenderPassword: string = "";

    static loadEnvironmentVariables() {
        const env = this.environment;
        const envFile = path.join(process.cwd(), `.env.${env}`)
        if (fs.existsSync(envFile)) {
            dotenv.config({ path: envFile });
        } else {
            const fallbackEnvFile = path.join(process.cwd(), '.env');
            if (fs.existsSync(fallbackEnvFile)) {
                dotenv.config({ path: fallbackEnvFile });
            } else {
                console.warn(`No environment file found for ${env}. Falling back to .env.`);
            }
        }
    }

    /**
     * Gets the current environment.
     * @returns The current environment as a string.
        */
    static get environment(): string {
        return (process.env.ENVIRONMENT ?? Configuration.Environment).toLowerCase();
    };

    /**
     * Gets the email receivers from environment variables or defaults.
     * @return The email receivers as a string.
     */
    static get emailReceivers(): string {
        return process.env.EMAIL_RECEIVERS ?? Configuration.EmailReceivers;
    };

    /**
     * Gets the sender email from environment variables or defaults.
     * @return The sender email as a string.
     */
    static get senderEmail(): string {
        return process.env.SENDER_EMAIL ?? Configuration.SenderEmail;
    };

    /**
     * Gets the sender password from environment variables or defaults.
     * @return The sender password as a string.
     */
    static get senderPassword(): string {
        return process.env.SENDER_PASSWORD ?? Configuration.SenderPassword;
    };

    /**
     * Gets a specific environment variable by key.
     * @param key The key of the environment variable.
     * @returns The value of the environment variable or undefined if not set.
     */
    static get(key: string): string | undefined {
        return process.env[key] || undefined;
    };

    /**
     * Sets a specific environment variable by key.
     * @param key The key of the environment variable.
     * @param value The value to set for the environment variable.
     */
    static set(key: string, value: string): void {
        process.env[key] = value;
    };
};

Configuration.loadEnvironmentVariables();
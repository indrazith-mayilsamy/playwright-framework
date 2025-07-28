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

    static get environment(): string {
        return (process.env.ENVIRONMENT ?? Configuration.Environment).toLowerCase();
    };

    static get emailReceivers(): string {
        return process.env.EMAIL_RECEIVERS ?? Configuration.EmailReceivers;
    };

    static get senderEmail(): string {
        return process.env.SENDER_EMAIL ?? Configuration.SenderEmail;
    };

    static get senderPassword(): string {
        return process.env.SENDER_PASSWORD ?? Configuration.SenderPassword;
    };

    static get(key: string): string | undefined {
        return process.env[key] || undefined;
    };

    static set(key: string, value: string): void {
        process.env[key] = value;
    };
};

Configuration.loadEnvironmentVariables();
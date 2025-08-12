import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { showHtmlReport } from './reportServerCreation';

export default class HtmlReporter implements Reporter {
    private results: Record<string, string>[] = []
    private outputPath: string = "test-results.html"
    private totalExecutionTime: number = 0;
    screenShotPath: string = "";
    private server: http.Server | null = null;

    private startTime: Date;
    private endTime: Date | undefined;

    projectFolder: string = path.basename(process.cwd().toUpperCase());
    testEnvironment: string = process.env.TEST_ENVIRONMENT || "QA";

    formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        };
        return date.toLocaleDateString('en-GB', options).replace(',', '').replace('AM', 'am').replace('PM', 'pm');
    };

    constructor() {
        this.startTime = new Date();
        this.server = null;
    };

    onTestEnd(test: TestCase, result: TestResult): void {
        this.screenShotPath = "";
        const isTime = this.formatDate(new Date());
        const module = test.parent.title || "";
        const screenShotPath = result.attachments.find(attachment => attachment.name === 'screenshot')?.path?.replace(/\\/g, '/') || "";
        const testDuration = result.duration / 1000 || 0;;
        this.totalExecutionTime += testDuration;

        let errorMessage = "";
        if (result.status === 'skipped') {
            errorMessage = result.error?.message || "Test was skipped due to an error occurring in a previous test.";
        } else if (result.status === 'failed') {
            errorMessage = result.error?.message || "Test failed without an error message.";
        };

        this.results.push({
            TESTSCENARIO: test.title,
            MODULE: module,
            STATUS: result.status.charAt(0).toUpperCase() + result.status.slice(1),
            DURATION: testDuration.toFixed(2) + 's',
            ERRORMESSAGE: errorMessage,
            EXECUTEDTIME: isTime,
            SCREENSHOTPATH: screenShotPath || 'N/A'
        });
    };

    async onEnd() {
        if (this.results.length === 0) return;
        this.endTime = new Date();
        const executionStartTime = this.formatDate(this.startTime);
        const executionEndTime = this.formatDate(this.endTime);

        const totalTests = this.results.length;
        const totalPassed = this.results.filter(result => result.STATUS === 'Passed').length;
        const totalFailed = this.results.filter(result => result.STATUS === 'Failed').length;
        const totalSkipped = this.results.filter(result => result.STATUS === 'Skipped').length;
        const timedOutTests = this.results.filter(result => result.STATUS === 'TimedOut').length;
        const interupptedTests = this.results.filter(result => result.STATUS === 'Interrupted').length;

        const percentage = (count: number): string => ((count / totalTests) * 100).toFixed(2) + '%';
        const totalTimeFormatted = this.totalExecutionTime.toFixed(2) + 's';
        const totalTimeMinutes = (this.totalExecutionTime / 60).toFixed(2) + 'm';

        const projectBasePath = path.resolve(process.cwd()).replace(/\\/g, '/');
        
        const statusColors = (data: string) => {
            switch (data.toLowerCase()) {
                case 'passed':
                    return 'green';
                case 'failed':
                    return 'red';
                case 'skipped':
                    return 'orange';
                case 'timedout':
                    return 'purple';
                case 'interrupted':
                    return 'blue';
                default:
                    return 'black';
            }
        };

        const executionTimeByStatus = {
            Passed: this.results.filter(result => result.STATUS === 'Passed').reduce((sum, result) => sum + parseFloat(result.DURATION), 0).toFixed(2) + 's',
            Failed: this.results.filter(result => result.STATUS === 'Failed').reduce((sum, result) => sum + parseFloat(result.DURATION), 0).toFixed(2) + 's',
            Skipped: this.results.filter(result => result.STATUS === 'Skipped').reduce((sum, result) => sum + parseFloat(result.DURATION), 0).toFixed(2) + 's',
            TimedOut: this.results.filter(result => result.STATUS === 'TimedOut').reduce((sum, result) => sum + parseFloat(result.DURATION), 0).toFixed(2) + 's',
            Interrupted: this.results.filter(result => result.STATUS === 'Interrupted').reduce((sum, result) => sum + parseFloat(result.DURATION), 0).toFixed(2) + 's'
        };

        const templatePath = path.join(projectBasePath, 'utils', 'reporters', 'template.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

        htmlTemplate = htmlTemplate
            .replace(/{{project}}/g, this.projectFolder)
            .replace(/{{testEnvironment}}/g, this.testEnvironment)
            .replace(/{{executionStartTime}}/g, executionStartTime)
            .replace(/{{executionEndTime}}/g, executionEndTime)
            .replace(/{{totalTests}}/g, totalTests.toString())
            .replace(/{{totalPassed}}/g, totalPassed.toString())
            .replace(/{{totalFailed}}/g, totalFailed.toString())
            .replace(/{{totalSkipped}}/g, totalSkipped.toString())
            .replace(/{{timedOutTests}}/g, timedOutTests.toString())
            .replace(/{{interruptedTests}}/g, interupptedTests.toString())
            .replace(/{{percentagePassed}}/g, percentage(totalPassed))
            .replace(/{{percentageFailed}}/g, percentage(totalFailed))
            .replace(/{{percentageSkipped}}/g, percentage(totalSkipped))
            .replace(/{{percentageTimedOut}}/g, percentage(timedOutTests))
            .replace(/{{percentageInterrupted}}/g, percentage(interupptedTests))
            .replace(/{{executionTimeByStatus\.Passed}}/g, executionTimeByStatus.Passed)
            .replace(/{{executionTimeByStatus\.Failed}}/g, executionTimeByStatus.Failed)
            .replace(/{{executionTimeByStatus\.Skipped}}/g, executionTimeByStatus.Skipped)
            .replace(/{{executionTimeByStatus\.TimedOut}}/g, executionTimeByStatus.TimedOut)
            .replace(/{{executionTimeByStatus\.Interrupted}}/g, executionTimeByStatus.Interrupted)
            .replace(/{{totalExecutionTime}}/g, totalTimeFormatted)
            .replace(/{{results}}/g, this.results.map((row, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${row.TESTSCENARIO}</td>
                    <td>${row.MODULE}</td>
                    <td>${row.DURATION}</td>
                    <td>${row.EXECUTEDTIME}</td>
                    <td style="color: ${statusColors(row.STATUS)};">${row.STATUS}</td>
                    <td>${row.ERRORMESSAGE || 'N/A'}</td>
                    <td>${row.SCREENSHOTPATH !== 'N/A' ? `<a href="${row.SCREENSHOTPATH}">View Screenshot</a>` : 'N/A'}</td>
                </tr>`
            ).join(''))
            .replace(/{{projectBasePath}}/g, projectBasePath);

        await fs.promises.mkdir(path.dirname(this.outputPath), { recursive: true });
        await fs.promises.writeFile(this.outputPath, htmlTemplate, 'utf-8');
        await showHtmlReport(this.outputPath);
    };
}
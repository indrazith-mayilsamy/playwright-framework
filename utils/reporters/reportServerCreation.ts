import http from 'http';
import fs from 'fs';
import path from 'path';
import open from 'open'

function startHTMLReportServer(filePath: string, host: string = 'localhost', port: number = 3000) {
    const server = http.createServer((req, res) => {
        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            res.writeHead(404, { 'content-type': 'text/plain' });
            res.end('File Not Found');
            return;
        }
        res.writeHead(200, { 'content-type': 'text/html' });
        fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, host, () => {
        console.log(`\n     Serving HTML Report at http://${host}:${port}. Press ctrl+c to quit`)
    });

    return server;
}

export async function showHtmlReport(reportFile: string, host: string = 'localhost', port: number = 3000) {
    const filePath = path.resolve(process.cwd(), reportFile);
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        console.error(`No Report found at "${filePath}"`);
        return;
    };
    startHTMLReportServer(filePath, host, port);
    let url = `http://${host}:${port}`;
    open(url).catch(() => console.error('Failed to Open Browser'));
    await new Promise(() => { });
}
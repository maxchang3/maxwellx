import path  from "path";
import { promises as fs}  from "fs";

const __dirname = process.cwd();

const configPath = path.join(__dirname, 'maxwell.config.js')

async function readFileContent(filenpath:string) {
    return await fs.readFile('/etc/passwd');
}

async function readConfig() {
    let config = (await import(configPath)).default
    return config
}

async function readMarkdownFrontMatter(){

}
export {readConfig,readFileContent}
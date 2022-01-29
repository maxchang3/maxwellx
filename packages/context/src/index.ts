import path from "path";
import { promises as fs } from "fs";
import { readFileOptions } from "./types";

const __dirname = process.cwd();

const configPath = path.join(__dirname, 'maxwell.config.js')

function getFilePath(folder: string, filename: string) {
    return path.join(__dirname, folder, filename)
}

async function readFileContent(folder: string, filename: string, options?: readFileOptions) {
    let fileContent = await fs.readFile(getFilePath(folder, filename), {encoding: options?.encoding || 'utf-8'});
    if(options?.escape) return // todo ;
    return fileContent
}

async function readConfig() {
    let config = (await import(configPath)).default
    return config
}


export { readConfig, readFileContent }
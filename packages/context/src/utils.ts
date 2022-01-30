import path from "path";
import { promises as fs } from "fs";
import type { readFileOptions } from "./types";

const __dirname = process.cwd();

const configPath = path.join(__dirname, 'maxwell.config.js')

function getFilePath(folder: string[], filename?: string) {
    return path.join(__dirname, ...folder, filename ? filename : '')
}
/** 
遍历指定目录下文件与目录，并判断是否为文件。
由于每次 Promise 为真，在 filter 中无法直接获取 stat.isDirectory。
这里先使用 map 获取所有 Promise，再用 Promise.all 接收后 await。
考虑到后期拓展性与性能优化，这里不使用同步版本的 fs。
*/
async function getFiles(...folder: string[]) {
    let files = await fs.readdir(getFilePath(folder))
    const fileStatPromise = files.map(file => fs.lstat(getFilePath(folder, file)))
    const fileStat = await Promise.all(fileStatPromise)
    files = files.filter((_file, index) => !(fileStat[index].isDirectory()))
    return files
}

async function readFileContent(folder: string[], filename: string, options?: readFileOptions) {
    let fileContent = await fs.readFile(getFilePath(folder, filename), { encoding: options?.encoding || 'utf-8' });
    if (options?.escape) return fileContent// todo ;
    return fileContent
}

export { readFileContent, getFilePath, getFiles, configPath, __dirname, path }

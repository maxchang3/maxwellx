import path from "path";
import { promises as fs } from "fs";
import type { readFileOptions } from "./types";

const __dirname = process.cwd();

const configPath = path.join(__dirname, 'maxwell.config.js')

function getFilePath(...paths: string[]) {
    return path.join(__dirname, ...paths)
}
/**
 * Traverse files and dirs in the path, then judge if it is a file, then return it。
 * It's an async generator, so you need to get it value by `for await……of `
 * First we use `map` generator all `promise` object, then use `for of` and `yield` return it
 * @param paths 
 * @param fileExtension need to with `.` , such as `.md` 
 */
async function* getFiles(paths: string[], fileExtension?: string) {
    let files = await fs.readdir(getFilePath(...paths))
    const fileStatPromise = files.map(file => fs.lstat(getFilePath(...paths, file)))
    const fileExtBool = (index: number) => fileExtension ? path.extname(files[index]) == fileExtension : true
    for (let [index, fileStat] of fileStatPromise.entries()) {
        if ((await fileStat).isFile() && fileExtBool(index)) yield files[index]
    }
}
/**
 * Traverse files and dirs in the path, then judge if it is a file, then return it。
 * @param paths 
 * @param fileExtension need to with `.` , such as `.md` 
 */
async function getFilesOnce(paths: string[], fileExtension?: string) {
    let files = await fs.readdir(getFilePath(...paths))
    const fileStatPromise = files.map(file => fs.lstat(getFilePath(...paths, file)))
    const fileExtBool = (index: number) => fileExtension ? path.extname(files[index]) == fileExtension : true
    const fileStat = await Promise.all(fileStatPromise)
    files = files.filter((_file, index) => fileStat[index].isFile() && fileExtBool(index))
    return files
}

async function readFileContent(paths: string[], options?: readFileOptions) {
    let fileContent = await fs.readFile(getFilePath(...paths), { encoding: options?.encoding || 'utf-8' });
    if (options?.escape) return fileContent// todo ;
    return fileContent
}

async function writeFile(paths: string[], content: string) {
    return fs.writeFile(getFilePath(...paths), content)
}

export { readFileContent, getFilePath, getFiles, getFilesOnce, writeFile, configPath, __dirname, path }

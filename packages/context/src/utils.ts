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
 * @param paths 
 * @param fileExtension need to with `.` , such as `.md` 
 */
async function getFiles(paths: string[], fileExtension?: string) {
    let files = await fs.readdir(getFilePath(...paths))
    const fileStatPromise = files.map(file => fs.lstat(getFilePath(...paths, file)))
    const fileExtBool = (index: number) => fileExtension ? path.extname(files[index]) == fileExtension : true
    const fileStat = await Promise.all(fileStatPromise)
    files = files.filter((_file, index) => fileStat[index].isFile() && fileExtBool(index))
    return files
}

async function getDirs(paths: string[]) {
    let dirs = await fs.readdir(getFilePath(...paths))
    const fileStatPromise = dirs.map(dir => fs.lstat(getFilePath(...paths, dir)))
    const fileStat = await Promise.all(fileStatPromise)
    dirs = dirs.filter((_file, index) => fileStat[index].isDirectory())
    return dirs
}

async function readFileContent(paths: string[], options?: readFileOptions) {
    let fileContent = await fs.readFile(getFilePath(...paths), { encoding: options?.encoding || 'utf-8' });
    if (options?.escape) return fileContent// todo ;
    return fileContent
}

async function writeFile(paths: string[], content: string) {
    await fs.mkdir(getFilePath(...paths.slice(0, -1)), { recursive: true })
    const filePath = getFilePath(...paths)
    return fs.writeFile(filePath, content).then(()=> filePath)
}

/**
 * Traverse the given keyList, and pass each key into the given promise function
 * then Promise.all() the promise list and get the whole value once
 */
async function forPromiseAll<T>(keyList: string[], promiseFunc: (key: string) => Promise<T>, withKey?: boolean) {
    let _promiseList = keyList.map(key => promiseFunc(key));
    let values = (await Promise.all(_promiseList))
    if (!(withKey)) return values
    let _result: { [key: string]: T } = {}
    values.forEach((value, index) => _result[keyList[index]] = value)
    return _result
}

async function copyFromTo(src: string[], dest: string[], complete: boolean = true) {
    let _src: string, _dest: string
    if (complete) {
        _src = getFilePath(...src)
        _dest = getFilePath(...dest)
    } else {
        _src = src[0]
        _dest = dest[0]
    }
    await fs.mkdir(_dest, { recursive: true });
    let entries = await fs.readdir(_src, { withFileTypes: true });
    for (let entry of entries) {
        let srcPath = path.join(_src, entry.name);
        let destPath = path.join(_dest, entry.name);

        entry.isDirectory() ?
            await copyFromTo([srcPath], [destPath], false) :
            await fs.copyFile(srcPath, destPath);
    }
}

export {
    readFileContent, getFilePath, getFiles,
    getDirs, writeFile, forPromiseAll, copyFromTo,
    configPath, __dirname, path
}

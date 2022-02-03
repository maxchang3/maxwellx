import path from "path";
import { promises as fs } from "fs";
import type { readFileOptions } from "./types";

const __dirname = process.cwd();

const configPath = path.join(__dirname, 'maxwell.config.js')

function getFilePath(...paths: string[]) {
    return path.join(__dirname, ...paths)
}
/**
 * 遍历指定目录下文件与目录，并判断是否为文件。
 * 实现为异步迭代生成器，先使用 map 生成所有 promise，再依次返回。
 * @param paths 
 * @param fileExtension 文件后缀，需要带 `.` ，例如 `.md` 
 */
async function* getFiles(paths: string[],fileExtension?:string) {
    let files = await fs.readdir(getFilePath(...paths))
    const fileStatPromise = files.map(file => fs.lstat(getFilePath(...paths, file)))
    const fileExtBool = (index:number)=> fileExtension? path.extname(files[index])==fileExtension :true
    for (let [index, fileStat] of fileStatPromise.entries()) {
        if ((await fileStat).isFile() && fileExtBool(index))  yield files[index]
    }
}
/**
 * 遍历指定目录下文件与目录，并判断是否为文件。
 * @param paths 
 * @param fileExtension 文件后缀，需要带 `.` ，例如 `.md` 
 */
async function getFilesOnce(paths:string[],fileExtension?:string){
    let files = await fs.readdir(getFilePath(...paths))
    const fileStatPromise = files.map(file => fs.lstat(getFilePath(...paths, file)))
    const fileExtBool = (index:number)=> fileExtension? path.extname(files[index])==fileExtension :true
    const fileStat = await Promise.all(fileStatPromise)
    files = files.filter((_file, index) => fileStat[index].isFile() && fileExtBool(index))
    return files
}

async function readFileContent(paths: string[], options?: readFileOptions) {
    let fileContent = await fs.readFile(getFilePath(...paths), { encoding: options?.encoding || 'utf-8' });
    if (options?.escape) return fileContent// todo ;
    return fileContent
}
export { readFileContent, getFilePath, getFiles, getFilesOnce, configPath, __dirname, path }

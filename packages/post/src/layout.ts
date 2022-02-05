import { readFileContent, getFiles, getDirs } from "@maxwellx/context"
import type { context } from "@maxwellx/context"
import type { frontMatter, layoutContext, layoutFiles } from "./types"
import yaml from "js-yaml";

function formatFileName(folder: string[]) {
    let title = folder.at(-1) as string
    return title.toLowerCase().replaceAll(' ', '-').replaceAll(' ', '-').slice(0, -3)
}

async function parseFrontMatter(content: string) {
    let frontMatter = yaml.load(content) as Promise<object>
    return frontMatter
}

async function getLayoutContext(...folder: string[]) {
    let content = await readFileContent(folder)
    const frontMatterReg = /---(.*?)---/sg
    let frontMatterText = frontMatterReg.exec(content)
    let frontMatter: frontMatter, layoutContent: string
    if (frontMatterText) {
        frontMatter = (await parseFrontMatter(frontMatterText[1])) as frontMatter
        layoutContent = content.replace(`${frontMatterText[0]}\n`, '')
    } else {
        frontMatter = {}
        layoutContent = content
    }
    if (!(frontMatter.layout)) frontMatter.layout = folder.at(-2)
    let filename = formatFileName(folder)
    let context: layoutContext = {
        frontMatter,
        content: layoutContent,
        filename
    }
    return context
}

async function* getFilesContext(context: context) {
    const basepath = context.config.directory.source
    const layouts = (await getDirs([basepath]))
    let layoutFiles: layoutFiles = {}
    console.log(layouts)
    for(let layout of layouts){
        layoutFiles[layout] = (await getFiles([basepath,layout],".md"))
    }
    for(let layout in layoutFiles){
        let files = layoutFiles[layout]
        for(let file of files){
            yield getLayoutContext(basepath,layout,file)
        }
    }
}

export { getFilesContext }
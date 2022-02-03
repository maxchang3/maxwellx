import { readFileContent, getFiles } from "@maxwellx/context"
import type { frontMatter, postContext, context } from '@maxwellx/context'
import yaml from "js-yaml";

function formatTitle(title:string){
    return title.toLowerCase().replaceAll(' ','-')
}

async function parseFrontMatter(content: string) {
    let frontMatter = yaml.load(content) as Promise<object>
    return frontMatter
}

async function getPostContext(...folder: string[]) {
    let content = await readFileContent(folder)
    const frontMatterReg = /---(.*?)---/sg
    let frontMatterText = frontMatterReg.exec(content)
    let frontMatter: frontMatter, postValue: string
    if (frontMatterText) {
        frontMatter = (await parseFrontMatter(frontMatterText[1])) as frontMatter
        postValue = content.replace(`${frontMatterText[0]}\n`, '')
    } else {
        frontMatter = {}
        postValue = content
    }
    if (!(frontMatter.layout)) frontMatter.layout = "post"
    // transfer & format & remove file extention
    let filename = formatTitle(folder.at(-1) as string).slice(0,-3)
    let context: postContext = {
        frontMatter,
        content: postValue,
        filename
    }
    return context
}

async function* getPostFilesContext(context: context) {
    const basepath = [context.config.directory.source, "_posts"]
    const files = getFiles(basepath, '.md')
    for await (let file of files) {
        yield getPostContext(...basepath, file)
    }
}

export { getPostFilesContext, getPostContext }
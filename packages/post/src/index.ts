import { readFileContent, getFiles } from "@maxwellx/context"
import type { frontMatter, postContext, context } from '@maxwellx/context'
import yaml from "js-yaml";

async function parseFrontMatter(content: string) {
    let frontMatter = yaml.load(content) as Promise<object>
    return frontMatter
}


async function readPostContext(folder: string[], filename: string) {
    let content = await readFileContent(folder, filename)
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
    // 对于从这个函数读取的文件，除非做特殊声明否则默认 layout 按 post 处理。
    if (!(frontMatter.layout)) frontMatter.layout = "post"
    let context: postContext = {
        frontMatter,
        content: postValue
    }
    return context
}


async function* getPostFilesContent(context: context) {
    const basepath = [context.config.directory.source, "_posts"]
    const files = getFiles(basepath, '.md')
    for await (let file of files) {
        yield readPostContext(basepath, file)
    }
}

export { getPostFilesContent, readPostContext }
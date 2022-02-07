import type { context } from "@maxwellx/context"
import type { filesContext, pageContext } from "@maxwellx/layout"
import type { generatorFunc } from "./types"

export class Generator {
    #generatorFunc: generatorFunc
    constructor(callback: generatorFunc) {
        this.#generatorFunc = callback
    }
    async generate(context: context, filesContext: filesContext): Promise<pageContext> {
        const generatorContext: context = {
            ...context,
            filesContext
        }
        let config = await this.#generatorFunc(generatorContext)
        const pageContext: pageContext = {
            frontMatter: config.frontmatter || {},
            content: config.content || "",
            filename: config.filename,
            data: config.data
        }
        return pageContext
    }

}
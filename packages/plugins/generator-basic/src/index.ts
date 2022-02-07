import { definePlugin, maxGenerator } from "@maxwellx/api";
import type { generatorConfig } from "@maxwellx/api"
import type { filesContext, frontMatter } from "@maxwellx/layout"

type postList = frontMatter[]

const basicGenerator = new maxGenerator(async (context) => {
    const filesContext: filesContext = context.filesContext
    const postList: postList = filesContext.map(file => {
        file.frontMatter.filename = file.filename
        return file.frontMatter
    })
    const config: generatorConfig = {
        filename: "index.html",
        data: {
            postList
        },
        layout: "index"
    }
    return config
})

export default definePlugin(basicGenerator)
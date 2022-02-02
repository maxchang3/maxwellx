import { context, readConfig, defaultConfig } from "@maxwellx/context";
import templateRenderer from "@maxwellx/renderer-eta";
import markdownRenderer from "@maxwellx/renderer-markdown-it";
import { getPostFilesContent } from "@maxwellx/post";

import type { maxwellCore } from './types'

class maxwell implements maxwellCore {
    context: context;
    plugins: any;
    constructor() {
        this.context = { config: defaultConfig };
    }
    async init() {
        await this.setConfig();
        //console.log(this.context)
    }
    async setConfig() {
        this.context.config = await readConfig()
       // console.log(this.context.config)
    }
    async render() {
        // this.rendererList.render();
        for await(let content of getPostFilesContent(this.context)){
            content.content = await markdownRenderer.render(content,this.context)
            let _context:context = {
                config:this.context.config,
                postContext: content
            }
            let result = await templateRenderer.render({
                filename:content.frontMatter.layout,
                path:this.context.config.directory.template            
            }, _context)
            console.log(result)
        }
    }

}

export { maxwell }

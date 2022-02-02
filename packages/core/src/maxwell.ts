import { context, readConfig, defaultConfig } from "@maxwellx/context";
import type{ Renderer, withContent, withReading } from "@maxwellx/api";
import { getPostFilesContent } from "@maxwellx/post";
import etaRenderer from "@maxwellx/renderer-eta";
import markdownItRenderer from "@maxwellx/renderer-markdown-it";

import type { maxwellCore } from './types'

class maxwell implements maxwellCore {
    context: context;
    renderer: {
        template: Renderer<withReading>,
        markdown: Renderer<withContent>
    };
    plugins: any;
    constructor() {
        this.context = { config: defaultConfig };
        this.renderer = {
            template: etaRenderer,
            markdown: markdownItRenderer
        }
    }
    async init() {
        await this.setConfig();
        let [_template , _markdown ] = await Promise.all([
             import(this.context.config.renderer.template), 
             import(this.context.config.renderer.markdown)
            ])
        console.log(_template,_markdown)
        this.renderer  = {
            template: _template.default,
            markdown: _markdown.default
        }
    }
    async setConfig() {
        this.context.config = await readConfig()
    }
    async render() {
        for await(let content of getPostFilesContent(this.context)){
            content.content = await this.renderer.markdown.render(content,this.context)
            let _context:context = {
                config:this.context.config,
                postContext: content
            }
            let result = await this.renderer.template.render({
                filename:content.frontMatter.layout,
                path:this.context.config.directory.template            
            }, _context)
            console.log(result)
        }
    }

}

export { maxwell }

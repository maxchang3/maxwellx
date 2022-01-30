import { context, readConfig, defaultConfig } from "@maxwellx/context";
import { RendererList } from "@maxwellx/renderer";
import { etaRenderer } from "@maxwellx/renderer-eta";
import { getPostFilesContent } from "@maxwellx/post";

import type { maxwellCore } from './types'

class maxwell implements maxwellCore {
    context: context;
    rendererList: RendererList;
    plugins: any;
    constructor() {
        this.context = { config: defaultConfig };
        this.rendererList = new RendererList(this.context);
    }
    async init() {
        await this.setConfig();
        this.setRenderer();
        //console.log(this.context)
    }
    async setConfig() {
        this.context.config = await readConfig()
       // console.log(this.context.config)
    }
    async setRenderer() {
        this.rendererList = new RendererList(this.context);
        this.rendererList.register(etaRenderer)
        // for plugins renderer
        // this.rendererList.register(all)
    }
    async render() {
        // this.rendererList.render();
        for await(let content of getPostFilesContent(this.context)){
            let _context:context = {
                config:this.context.config,
                postContext: content
            }
            let result = await etaRenderer.render(
                [this.context.config.directory.template], 
                content.frontMatter.layout, 
                _context)
            console.log(result)
        }
    }

}

export { maxwell }

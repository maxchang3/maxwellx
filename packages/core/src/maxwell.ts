import {  context, readConfig,defaultConfig  } from "@maxwell-blog/context";
import { RendererList } from "@maxwell-blog/renderer";
import { etaRenderer } from "@maxwell-blog/renderer-eta";
import type {  maxwellCore } from './types'

class maxwell implements maxwellCore {
    context: context;
    rendererList: RendererList;
    plugins: any;
    constructor() {
        this.context = {config:defaultConfig};
        this.rendererList = new RendererList(this.context);
    }
    async init() {
        await this.setConfig();
        this.setRenderer();
        //console.log(this.context)
    }
    async setConfig() {
        this.context.config = await readConfig()
        console.log(this.context.config)
    }
    async setRenderer() {
        this.rendererList = new RendererList(this.context);
        this.rendererList.register(etaRenderer)
        console.log(await etaRenderer.render([this.context.config.directory.template],"test",this.context))
        // for plugins renderer
        // this.rendererList.register(all)
    }
    async render(){
        this.rendererList.render();
    }

}

export { maxwell }
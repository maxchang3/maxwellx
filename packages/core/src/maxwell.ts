import {  context, readConfig, defaultConfig, __dirname } from "@maxwellx/context";
import { getPostFilesContext } from "@maxwellx/post";
import { loadPluginModule } from "@maxwellx/api"
import type { Renderer, withContent, withReading } from "@maxwellx/api";
import type { maxwellCore } from './types'

class maxwell implements maxwellCore {
    context: context;
    renderer?: {
        template: Renderer<withReading>,
        markdown: Renderer<withContent>
    };
    plugins: any;
    constructor() {
        this.context = { config: defaultConfig };
    }
    async init() {
        await this.#setConfig();
        await this.#loadRenderer();
    }
    async #setConfig() {
        this.context.config = await readConfig()
    }
    async #loadRenderer() {
        let [_template, _markdown] = await Promise.all([
            loadPluginModule(this.context.config.renderer.template),
            loadPluginModule(this.context.config.renderer.markdown)
        ])
        this.renderer = {
            template: _template,
            markdown: _markdown
        }
    }
    async* render() {
        if (!(this.renderer)) throw new Error("renderer not init")
        for await (let postContext of getPostFilesContext(this.context)) {
            postContext.content = await this.renderer.markdown.render(postContext, this.context)
            let _context: context = {
                config: this.context.config,
                postContext
            }
            // cause we add `postContext` in `_context` before
            // here we reassign it's value the `_context` will update too. 
            // But i don't think it's a good way to do that. :(
            postContext.content  = await this.renderer.template.render({
                filename: postContext.frontMatter.layout,
                path: this.context.config.directory.template
            }, _context)
            yield _context
        }
    }
    async* IO() {

    }
}

export { maxwell }

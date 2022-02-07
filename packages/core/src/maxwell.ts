import { context, readConfig, writeFile, promiseAllObject, defaultConfig, __dirname } from "@maxwellx/context";
import { getFilesContext } from "@maxwellx/layout";
import { loadPluginModule } from "@maxwellx/api"
import { Router } from "@maxwellx/router"
import type { Renderer, withContent, withReading } from "@maxwellx/api";
import type { filesContext } from "@maxwellx/layout"
import type { maxwellCore } from './types'
import { sep } from "path";

class maxwell implements maxwellCore {
    context: context;
    filesContext: filesContext;
    renderer?: {
        template: Renderer<withReading>,
        markdown: Renderer<withContent>
    };
    plugins: any;
    constructor() {
        this.context = { config: defaultConfig };
        this.filesContext = {}
    }
    async init() {
        await this.#setConfig();
        await this.#setFilesContext();
        await this.#loadRenderer();
        await this.#getRouter();
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
    async #setFilesContext() {
        this.filesContext = await getFilesContext(this.context)
    }
    async #getRouter() {
        if (!(this.renderer)) throw new Error("renderer not init")
        const { template } = this.renderer
        await this.#promiseAllObjSquare(this.filesContext, async (layout, file) => {
            let layoutRouter
            let pageContext = this.filesContext[layout][file]
            let _layout = pageContext.frontMatter.layout
            if (!(Object.keys(this.context.config.url.router).includes(_layout))) {
                _layout = "*"
            }
            layoutRouter = new Router(
                this.context.config.url.router[_layout].rule,
                pageContext,
                this.context.config.url.router[_layout].withIndex
            );
            pageContext.filename = layoutRouter.format()
            pageContext.filename += template.options?.output
        })
        return this.filesContext
    }
    async #promiseAllObjSquare(filesContext: filesContext, callback: (layout: string, file: string) => Promise<void>) {
        return promiseAllObject(filesContext, async (layout) => {
            promiseAllObject(filesContext[layout], (file) => callback(layout, file))
        })
    }
    async render() {
        if (!(this.renderer)) throw new Error("renderer not init")
        const { markdown, template } = this.renderer
        await this.#promiseAllObjSquare(this.filesContext, async (layout, file) => {
            let pageContext = this.filesContext[layout][file]
            //<Filter Plugin> todo:1 before_content_render
            pageContext.content = await markdown.render(pageContext, this.context)
            //<Filter Plugin> todo:2 after_content_render
            let _context: context = {
                config: this.context.config,
                pageContext
            }
            //<Filter Plugin> todo3: before_layout_render
            pageContext.content = await template.render({
                filename: `${pageContext.frontMatter.layout}`,
                path: this.context.config.directory.template
            }, _context)
            //<Filter Plugin> todo4: after_layout_render
        })
    }
    async write() {
        await this.#promiseAllObjSquare(this.filesContext, async (layout, file) => {
            let pageContext = this.filesContext[layout][file]
            let _layout = pageContext.frontMatter.layout
            if (!(Object.keys(this.context.config.url.router).includes(_layout))) {
                _layout = "*"
            }
            let basepath = [
                this.context.config.directory.public,
                ...pageContext.filename.split(sep)
            ]
            writeFile(basepath, pageContext.content)
        })
    }
}

export { maxwell }

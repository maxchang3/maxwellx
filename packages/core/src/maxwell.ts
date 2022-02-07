import { context, readConfig, writeFile, promiseAllObject, defaultConfig, __dirname } from "@maxwellx/context";
import { getFilesContext } from "@maxwellx/layout";
import { loadPluginModule, Router } from "@maxwellx/api"
import type { Renderer, withContent, withReading } from "@maxwellx/api";
import type { filesContext } from "@maxwellx/layout"
import type { maxwellCore } from './types'
import { sep } from "path";

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
    async render() {
        if (!(this.renderer)) throw new Error("renderer not init")
        const { markdown, template } = this.renderer
        let filesContext = await getFilesContext(this.context)
        await promiseAllObject(filesContext, async (layout) => {
            promiseAllObject(filesContext[layout], async (file) => {
                let pageContext = filesContext[layout][file]
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
                    path: this.context.config.directory.template //<Router Plugin> todo1
                }, _context)
                //<Filter Plugin> todo4: after_layout_render
            })
        })
        return filesContext
    }
    async write(filesContext: filesContext) {
        if (!(this.renderer)) throw new Error("renderer not init")
        const { template } = this.renderer
        await promiseAllObject(filesContext, async (layout) => {
            promiseAllObject(filesContext[layout], async (file) => {
                let layoutRouter
                let pageContext = filesContext[layout][file]
                if (pageContext.frontMatter.layout === "post") {
                    layoutRouter = new Router(
                        this.context.config.url.router.post.rule,
                        pageContext,
                        this.context.config.url.router.post.withIndex);
                } else {
                    layoutRouter = new Router(
                        this.context.config.url.router["*"].rule,
                        pageContext,
                        this.context.config.url.router["*"].withIndex);
                }
                pageContext.filename = layoutRouter.format()
                pageContext.filename += template.options?.output
                let basepath = [
                    this.context.config.directory.public,
                    ...pageContext.filename.split(sep)
                ]
                writeFile(basepath, pageContext.content)
            })
        })

    }
}

export { maxwell }

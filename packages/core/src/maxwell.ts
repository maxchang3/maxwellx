import { context, readConfig, writeFile, defaultConfig, __dirname } from "@maxwellx/context";
import { getFilesContext } from "@maxwellx/layout";
import { loadPlugin  } from "@maxwellx/api"
import { Router } from "@maxwellx/router"
import { sep } from "path";
import type { Renderer, withContent, withReading } from "@maxwellx/api";
import type { filesContext } from "@maxwellx/layout"
import type { maxwellCore } from './types'
import type{ plugins } from "@maxwellx/api";


class maxwell implements maxwellCore {
    context: context;
    filesContext: filesContext;
    renderer?: {
        template: Renderer<withReading>,
        markdown: Renderer<withContent>
    };
    plugins: plugins;
    constructor() {
        this.context = { config: defaultConfig };
        this.filesContext = []
        this.plugins = {
            "Filter": [],
            "Injector": [],
            "Renderer<withContent>": "",
            "Renderer<withReading>": "",
            "Generator": []
        }
    }
    async init() {
        await this.#setConfig();
        await this.#setFilesContext();
        await this.#loadPlugin();
        await this.#getRouter();
    }
    async #setConfig() {
        this.context.config = await readConfig()
    }
    async #loadPlugin() {
        this.plugins = await loadPlugin(this.context)
        this.renderer = {
            template: this.plugins["Renderer<withReading>"],
            markdown: this.plugins["Renderer<withContent>"]
        }
    }
    async #setFilesContext() {
        this.filesContext = await getFilesContext(this.context)
    }
    async #getRouter() {
        if (!(this.renderer)) throw new Error("renderer not init")
        const { template } = this.renderer
        this.filesContext.forEach(pageContext=>{
            let _layout = pageContext.frontMatter.layout
            if (!(Object.keys(this.context.config.url.router).includes(_layout))) {
                _layout = "*"
            }
            let layoutRouter = new Router(
                this.context.config.url.router[_layout].rule,
                pageContext,
                this.context.config.url.router[_layout].withIndex
            );
            pageContext.filename = layoutRouter.format()
            pageContext.filename += template.options?.output
        })
        return this.filesContext
    }

    async render() {
        if (!(this.renderer)) throw new Error("renderer not init")
        const { markdown, template } = this.renderer
        await Promise.all(this.filesContext.map(async(pageContext)=>{
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
        }))
    }
    async write() {
        await Promise.all(this.filesContext.map(async(pageContext)=>{
            let _layout = pageContext.frontMatter.layout
            if (!(Object.keys(this.context.config.url.router).includes(_layout))) {
                _layout = "*"
            }
            let basepath = [
                this.context.config.directory.public,
                ...pageContext.filename.split(sep)
            ]
            writeFile(basepath, pageContext.content)
        }))
    }
}

export { maxwell }

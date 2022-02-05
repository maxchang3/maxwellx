import { context, readConfig, writeFile, defaultConfig, __dirname } from "@maxwellx/context";
import { getFilesContext } from "@maxwellx/post";
import { loadPluginModule } from "@maxwellx/api"
import type { Renderer, withContent, withReading } from "@maxwellx/api";
import type { layoutContext } from "@maxwellx/post"
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
        for await (let layoutContext of getFilesContext(this.context)) {
            layoutContext.content = await this.renderer.markdown.render(layoutContext, this.context)
            let _context: context = {
                config: this.context.config,
                layoutContext
            }
            layoutContext.content = await this.renderer.template.render({
                filename: `${layoutContext.frontMatter.layout}`,
                path: this.context.config.directory.template
            }, _context)
            layoutContext.filename = `${layoutContext.filename}.${this.renderer.template.options?.output}`
            yield layoutContext
        }
    }
    async write(postGenerator: AsyncGenerator<layoutContext, void, unknown>) {
        for await (let layoutContext of postGenerator) {
            let basepath = [
                this.context.config.directory.public,
                layoutContext.frontMatter.layout,
                layoutContext.filename
            ]
            writeFile(basepath, layoutContext.content)
        }
    }
}

export { maxwell }

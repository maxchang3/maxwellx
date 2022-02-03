import { context, readConfig, defaultConfig, __dirname, getFilePath, readFileContent } from "@maxwellx/context";
import type { Renderer, withContent, withReading } from "@maxwellx/api";
import { getPostFilesContent } from "@maxwellx/post";

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
    async getPluginPath(pkg: string) {
        let pkgJSON = JSON.parse(await readFileContent(["node_modules", pkg, "package.json"]))
        return getFilePath("node_modules", pkg, pkgJSON.main)
    }
    async init() {
        await this.setConfig();
        let [_template, _markdown] = await Promise.all([
            import(await this.getPluginPath(this.context.config.renderer.template)),
            import(await this.getPluginPath(this.context.config.renderer.markdown))
        ])
        this.renderer = {
            template: _template.default,
            markdown: _markdown.default
        }
    }
    async setConfig() {
        this.context.config = await readConfig()
    }
    async render() {
        if (!(this.renderer)) throw new Error("renderer not init")
        for await (let content of getPostFilesContent(this.context)) {
            content.content = await this.renderer.markdown.render(content, this.context)
            let _context: context = {
                config: this.context.config,
                postContext: content
            }
            let result = await this.renderer.template.render({
                filename: content.frontMatter.layout,
                path: this.context.config.directory.template
            }, _context)
            console.log(result)
        }
    }

}

export { maxwell }

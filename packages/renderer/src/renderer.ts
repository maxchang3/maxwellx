import type { maxRenderer, maxRendererList, renderFunc, renderers, renderData } from "./types";
import type { context } from '@maxwell-blog/context'
import { getFilePath } from "@maxwell-blog/context";
export class RendererList implements maxRendererList {
    context: context;
    rendererList: renderers = {};

    constructor(context: context) {
        this.context = context
    }

    register(renderer: Renderer): void {
        this.rendererList[renderer.input] = renderer
    }

    render() {
        // for (let renderer of this) {
        //     // layout
        //     let rendering = renderer.render({
        //         paths: getFilePath([this.context.config.directory.template]),
        //         filename :`test.${renderer.input}`
        //     },this.context)
        //     rendering.then(res=>console.log(res))
        // }
    }

    *[Symbol.iterator]() {
        for (let renderer of Object.values(this.rendererList)) {
            yield renderer;
        }
    }
}

export class Renderer implements maxRenderer {
    input: string;
    output: string;
    callback: renderFunc;

    constructor(input: string, output: string, callback: renderFunc) {
        [this.input, this.output,  this.callback] = [input, output,  callback]
    }
    async render(path:string[],filename:string, context: any, options?: object) {
        return this.callback({
            paths: getFilePath(path),
            filename :`${filename}.${this.input}`
        }, context, options)
    }
}

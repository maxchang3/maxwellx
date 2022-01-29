import type { maxRenderer, maxRendererList, renderFunc, renderers, renderData } from "./types";

export class RendererList implements maxRendererList {
    context: any;
    rendererList: renderers = {};

    constructor(context: any) {
        this.context = context
    }

    register(renderer: maxRenderer): void {
        this.rendererList[renderer.input] = renderer
    }

    render() {
        for (let renderer of this) {
            // 读取渲染器对应后缀文件，进行生成。
            // findfile in xxxx if => readFileSync => render.callback(content,context,{})
            console.log(renderer.callback({ content: "1" }, this.context, {}))
        }
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
    dir: string;
    callback: renderFunc;

    constructor(input: string, output: string, dir: string, callback: renderFunc) {
        [this.input, this.output, this.dir, this.callback] = [input, output, dir, callback]
    }
    async render(data: renderData, context: any, options?: object) {
        return await this.callback(data, context, options)
    }
}
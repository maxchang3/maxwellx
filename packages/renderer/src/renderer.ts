import type { maxRenderer, maxRendererList, renderFunc, renderers, rendererWithRead, renderData, renderFuncWithRead } from "./types";
import type { context } from '@maxwellx/context'
import { getFilePath } from "@maxwellx/context";


export class RendererWithRead  implements rendererWithRead {
    input: string;
    output: string;
    callback: renderFuncWithRead;

    constructor(input: string, output: string, callback: renderFuncWithRead) {
        [this.input, this.output, this.callback] = [input, output, callback]
    }

    async render(path: string[], filename: string, context: context, options?: object) {
        return this.callback({
            path: getFilePath(path),
            filename: `${filename}.${this.input}`
        }, context, options)
    }
}

export class Renderer implements maxRenderer {
   callback: renderFunc;

    constructor( callback: renderFunc) {
        [this.callback] = [callback]
    }
    render( data:renderData ,context: context, options?: object): Promise<string> {
        return this.callback(data, context, options)
    }

}

import type { maxRenderer, renderOptions, withContent,  rendererWithRead, renderData, withReading, renderFilepath } from "./types";
import type { context } from '@maxwellx/context'
import { getFilePath } from "@maxwellx/context";


export class RendererWithRead implements rendererWithRead {
    input: string;
    output: string;
    callback: withReading;

    constructor(input: string, output: string, callback: withReading) {
        [this.input, this.output, this.callback] = [input, output, callback]
    }

    async render(path: string[], filename: string, context: context, options?: object) {
        return this.callback({
            path: getFilePath(path),
            filename: `${filename}.${this.input}`
        }, context, options)
    }
}

export class Renderer<T extends (withContent | withReading)> implements maxRenderer<T> {
    callback: T;
    options?: renderOptions;

    constructor(callback: T, options?: renderOptions) {
        [this.callback, this.options] = [callback, options]
    }
    render(data: (T extends withContent ? renderData : renderFilepath), context: context): Promise<string> {
        if(this.options){
            let _data = (<renderFilepath>data)
            return (<withReading>this.callback)({
                path: getFilePath([_data.path]),
                filename: `${_data.filename}.${this.options.input}`
            }, context)
        }else{
            return (<withContent>this.callback)(<renderData>data, context)  
        }
    }

}
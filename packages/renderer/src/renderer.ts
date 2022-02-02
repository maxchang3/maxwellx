import type { maxRenderer, renderOptions, withContent, renderData, withReading, renderFilepath } from "./types";
import type { context } from '@maxwellx/context'
import { getFilePath } from "@maxwellx/context";



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
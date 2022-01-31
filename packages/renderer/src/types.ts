import { context } from "@maxwellx/context";

interface renderFilepath {
    path: string,
    filename: string
}

interface renderData {
    content: string
}

type renderFuncWithRead = (data: renderFilepath, context: context, options?: object) => Promise<string>;
type renderFunc = (data: renderData, context: context, options?: object) => Promise<string>;


interface rendererWithRead {
    input: string;
    output: string;
    callback: renderFuncWithRead;
    render(path:string[],filename:string, context: any, options?: object): Promise<string> 
}

interface  maxRenderer{
    data: renderData;
    callback: renderFunc;
    render(data:renderData, context: any, options?: object): Promise<string> 
}

interface renderers {
    [key: string]: maxRenderer
}

interface maxRendererList {
    context: any
    rendererList: renderers
    register(renderer: maxRenderer): void
}


export { renderers, renderFilepath, renderData, maxRenderer, rendererWithRead,maxRendererList, renderFunc ,renderFuncWithRead}

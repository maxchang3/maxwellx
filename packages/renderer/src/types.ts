interface renderData {
    paths: string,
    filename: string
}

type renderFunc = (data: renderData, context: any, options?: object) => Promise<string>;


interface maxRenderer {
    input: string;
    output: string;
    callback: renderFunc;
    render(path:string[],filename:string, context: any, options?: object): Promise<string> 
}

interface renderers {
    [key: string]: maxRenderer
}

interface maxRendererList {
    context: any
    rendererList: renderers
    register(renderer: maxRenderer): void
}


export { renderers, renderData, maxRenderer, maxRendererList, renderFunc }

interface renderData {
    content: string
}

type renderFunc = (data: renderData, context:any ,options: object) => string;


interface maxRenderer{
    input: string;
    output: string;
    dir: string;
    callback: renderFunc;
}

interface renderers {
    [key: string]: maxRenderer
}

interface maxRendererList {
    context: any
    rendererList: renderers
    register(renderer:maxRenderer): void
}


export { renderers, renderData, maxRenderer, maxRendererList, renderFunc }
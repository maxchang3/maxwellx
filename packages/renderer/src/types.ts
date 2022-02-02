import { context } from "@maxwellx/context";

interface renderFilepath {
    path: string,
    filename: string
}
interface renderData {
    content: string
}

type withReading = (data: renderFilepath, context: context, options?: object) => Promise<string>;
type withContent = (data: renderData, context: context, options?: object) => Promise<string>;


interface rendererWithRead {
    input: string;
    output: string;
    callback: withReading;
    render(path: string[], filename: string, context: context, options?: object): Promise<string>
}
interface renderOptions {
    input: string;
    output: string;
}
interface maxRenderer<T extends (withContent | withReading)> {
    callback: T;
    options?: renderOptions;
    render(data: (T extends withContent ? renderData : renderFilepath), context: context, options?: object): Promise<string>
}


export { renderFilepath, renderData, maxRenderer, rendererWithRead, withContent, withReading, renderOptions }

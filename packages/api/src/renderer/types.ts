import type { context } from "@maxwellx/context";
import type { pageContext } from "@maxwellx/layout"
interface renderFilepath {
    path: string,
    filename: string
}
type renderData = pageContext

type withReading = (data: renderFilepath, context: context, options?: object) => Promise<string>;
type withContent = (data: renderData, context: context, options?: object) => Promise<string>;
type dataOrPath<T> = (T extends withContent ? renderData : renderFilepath)

interface renderOptions {
    input: string;
    output: string;
}

interface maxRenderer<T extends (withContent | withReading)> {
    callback: T;
    options?: renderOptions;
    render(data: dataOrPath<T>, context: context, options?: object): Promise<string>
}


export {
    renderFilepath, renderData,
    maxRenderer, withContent,
    withReading, renderOptions,
    dataOrPath
}

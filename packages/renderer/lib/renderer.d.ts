import type { maxRenderer, maxRendererList, renderFunc, renderers } from "./types";
export declare class RendererList implements maxRendererList {
    context: any;
    rendererList: renderers;
    constructor(context: any);
    register(renderer: maxRenderer): void;
    render(): void;
    [Symbol.iterator](): Generator<maxRenderer, void, unknown>;
}
export declare class Renderer implements maxRenderer {
    input: string;
    output: string;
    dir: string;
    callback: renderFunc;
    constructor(input: string, output: string, dir: string, callback: renderFunc);
}

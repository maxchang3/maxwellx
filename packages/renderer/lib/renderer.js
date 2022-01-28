export class RendererList {
    context;
    rendererList = {};
    constructor(context) {
        this.context = context;
    }
    register(renderer) {
        this.rendererList[renderer.input] = renderer;
    }
    render() {
        for (let renderer of this) {
            // 读取渲染器对应后缀文件，进行生成。
            // findfile in xxxx if => readFileSync => render.callback(content,context,{})
            console.log(renderer.callback({ content: "1" }, this.context, {}));
        }
    }
    *[Symbol.iterator]() {
        for (let renderer of Object.values(this.rendererList)) {
            yield renderer;
        }
    }
}
export class Renderer {
    input;
    output;
    dir;
    callback;
    constructor(input, output, dir, callback) {
        [this.input, this.output, this.dir, this.callback] = [input, output, dir, callback];
    }
}
//# sourceMappingURL=renderer.js.map
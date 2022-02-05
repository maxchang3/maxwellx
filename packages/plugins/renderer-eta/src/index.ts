import { Renderer , definePlugin } from "@maxwellx/api";
import type { withReading } from "@maxwellx/api";
import { renderFile, configure } from "eta"

const etaRenderer = new Renderer<withReading>(async (data, context, options) => {
    configure({
        views: data.path,
        cache: true
    })
    return renderFile(data.filename, context, { autoEscape: false }) as Promise<string>;
}, {
    input: "eta",
    output: "html"
})

export default definePlugin(etaRenderer)

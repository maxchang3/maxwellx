import { Renderer , definePlugin } from "@maxwellx/api";
import type { withReading } from "@maxwellx/api";
import { renderFile, configure } from "eta"

const etaRenderer = new Renderer<withReading>(async (data, context, options) => {
    configure({
        views: data.path,
        cache: true
    })
    context.pageContext.content =  await renderFile(data.filename, context, { autoEscape: false })
    return context.pageContext
}, {
    input: "eta",
    output: "html"
})

export default definePlugin(etaRenderer)

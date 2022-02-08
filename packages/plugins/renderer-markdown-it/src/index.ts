import { __dirname } from "@maxwellx/context"
import { Renderer, withContent, definePlugin } from "@maxwellx/api";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-toc-done-right";
const md = MarkdownIt()
let tocData: string = ""
md.use(anchor, { permalink: false }).use(toc, {
    callback: (html) => {
        tocData = html
    },
    containerId: "toc-container",
    listClass: "toc-list",
    itemClass: "toc-item",
    linkClass: "toc-link",
})
const markdownitRenderer = new Renderer<withContent>(async (pageContext, context, options) => {
    pageContext.content = md.render(pageContext.content)
    pageContext.data.toc = tocData
    return pageContext
})

export default definePlugin(markdownitRenderer)

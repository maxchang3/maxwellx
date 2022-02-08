import { __dirname } from "@maxwellx/context"
import { Renderer, withContent, definePlugin } from "@maxwellx/api";
import MarkdownIt from "markdown-it";

const md = MarkdownIt()

const markdownitRenderer = new Renderer<withContent>(async(pageContext,context,options)=>{
    pageContext.content = md.render(pageContext.content)
    return pageContext
})

export default definePlugin(markdownitRenderer)

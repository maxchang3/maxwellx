import { __dirname } from "@maxwellx/context"
import { Renderer, withContent, definePlugin } from "@maxwellx/api";
import MarkdownIt from "markdown-it";

const md = MarkdownIt()

const markdownitRenderer = new Renderer<withContent>(async(data,context,options)=>{
    return md.render(data.content);
})

export default definePlugin(markdownitRenderer)

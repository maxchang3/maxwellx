import { __dirname } from "@maxwellx/context"
import { Renderer, withContent, definePlugin } from "@maxwellx/api";
import MarkdownIt from "markdown-it";

const md = MarkdownIt()

const markdownitRenderer = new Renderer<withContent>(async(data,context,options)=>{
    data.content = md.render(data.content)
    return data;
})

export default definePlugin(markdownitRenderer)

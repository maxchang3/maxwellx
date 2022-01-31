import { __dirname } from "@maxwellx/context"
import { Renderer } from "@maxwellx/renderer";
import MarkdownIt from "markdown-it";

const md = MarkdownIt()

const markdownitRenderer = new Renderer(async(data,context,options)=>{
    return md.render(data.content);
})

export {markdownitRenderer}

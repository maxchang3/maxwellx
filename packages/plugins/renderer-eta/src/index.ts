import { __dirname } from "@maxwell-blog/context"
import { Renderer } from "@maxwell-blog/renderer";
import path from "path"
import {renderFile,configure} from "eta"

configure({
    views: path.join(__dirname, "theme")
})


const etaRenderer = new Renderer("eta","html","theme",async(data,context,options)=>{
    return renderFile(data.content, context) as Promise<string>;
})

export {etaRenderer}
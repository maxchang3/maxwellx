import { __dirname } from "@maxwell-blog/context"
import { Renderer } from "@maxwell-blog/renderer";
import {renderFile,configure} from "eta"

const etaRenderer = new Renderer("eta","html",async(data,context,options)=>{
    configure({
        views: data.paths
    })
    return renderFile(data.filename, context) as Promise<string>;
})

export {etaRenderer}

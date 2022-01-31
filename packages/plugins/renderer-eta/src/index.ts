import { __dirname } from "@maxwellx/context"
import { RendererWithRead } from "@maxwellx/renderer";
import {renderFile,configure} from "eta"

const etaRenderer = new RendererWithRead("eta","html",async(data,context,options)=>{
    configure({
        views: data.path
    })
    return renderFile(data.filename, context) as Promise<string>;
})

export {etaRenderer}

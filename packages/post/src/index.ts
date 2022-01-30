import { context,readPostContext} from "@maxwellx/context"
import { getFiles } from "@maxwellx/context"

async function* getPostFilesContent(context: context) {
    const basepath = [context.config.directory.source,"_posts"]
    const files = getFiles(...basepath)
    for await(let file of files){
         yield readPostContext(basepath,file)
    }
}
export { getPostFilesContent }
import { maxwell } from "@maxwellx/core";
import { getPostFilesContent } from "@maxwellx/post";
const core = new maxwell();
await core.init();
// core.render()

for await(let content of getPostFilesContent(core.context)){
    console.log(content)
}
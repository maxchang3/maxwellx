import { maxwell } from "@maxwellx/core";
// import { getPostFilesContent } from "@maxwellx/layout";
const core = new maxwell();
await core.init();
let renderList = core.render()
core.write(renderList)
// for await(let content of getPostFilesContent(core.context)){
//     console.log(content)
// }
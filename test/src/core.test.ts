import { maxwell } from "@maxwellx/core";
// import { getPostFilesContent } from "@maxwellx/layout";
const core = new maxwell();
await core.init();
let start = performance.now()
let files = await core.render()
await core.write(files)
let end = performance.now()
console.log(end - start)
// core.write(renderList)
// for await(let content of getPostFilesContent(core.context)){
//     console.log(content)
// }
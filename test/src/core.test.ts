import { maxwell } from "@maxwellx/core";
// import { getPostFilesContent } from "@maxwellx/layout";
const core = new maxwell();
let start = performance.now()
await core.init();
await core.render()
await core.write()
let end = performance.now()
console.log(end - start)
// core.write(renderList)
// for await(let content of getPostFilesContent(core.context)){
//     console.log(content)
// }
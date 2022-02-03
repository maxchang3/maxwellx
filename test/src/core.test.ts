import { maxwell } from "@maxwellx/core";
// import { getPostFilesContent } from "@maxwellx/post";
const core = new maxwell();
await core.init();
let renderList = core.render()
for await(let result of renderList){
    console.log(result)
}

// for await(let content of getPostFilesContent(core.context)){
//     console.log(content)
// }
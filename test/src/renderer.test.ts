import { Renderer } from '@maxwellx/renderer'
import { readPostContext } from "@maxwellx/post";

import { etaRenderer } from "@maxwellx/renderer-eta";

// let test = await etaRenderer.render({paths,},{test:1})

// console.log(test)
// let renderList = new RendererList({context:'qwq'})

// let pug_renderer = new Renderer("pug","html","./theme/",(data,context,options)=>{
//     return `render:${data.content}`
// })

// let scss_renderer = new Renderer("scss","css","./theme/",(data,context,options)=>{
//     return `render:${data.content}`
// })

// let post = await readPostContext("source/_posts","testpost.md");

// renderList.register(pug_renderer);
// renderList.register(scss_renderer);

// renderList.render()
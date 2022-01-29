import {Renderer,RendererList} from '@maxwell-blog/renderer'
import { readPostContext} from "@maxwell-blog/context";

import { etaRenderer } from "@maxwell-blog/renderer-eta";

let test = await etaRenderer.render({content:"test.eta"},{test:1})

console.log(test)
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
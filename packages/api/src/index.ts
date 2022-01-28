import {Renderer,RendererList} from '@maxwell-blog/renderer'

let renderList = new RendererList({context:'qwq'})

let pug_renderer = new Renderer("pug","html","./theme/",(data,context,options)=>{
    return `render:${data.content}`
})

let scss_renderer = new Renderer("scss","css","./theme/",(data,context,options)=>{
    return `render:${data.content}`
})

renderList.register(pug_renderer);
renderList.register(scss_renderer);

// for(let render of renderers){
//     console.log(render.callback)
// }


renderList.render()
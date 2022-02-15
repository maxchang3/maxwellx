import { definePlugin, Filter } from "@maxwellx/api";

const testFilter1 = new Filter("before_content_render", (pageContext) => {
    pageContext.content+="## before_content_render"
    return pageContext
})

const testFilter2 = new Filter("after_content_render", (pageContext) => {
    pageContext.content+="## after_content_render"
    return pageContext
})


export default definePlugin([
    testFilter1,
    testFilter2
])

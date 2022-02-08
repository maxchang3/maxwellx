import type { pageContext } from "@maxwellx/layout"

type filter = "before_content_render" |
    "after_content_render" 

type filterFunc = (pageContext: pageContext) => pageContext

export { filter, filterFunc }
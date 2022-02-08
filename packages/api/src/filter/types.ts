import type { pageContext } from "@maxwellx/layout"

type filter = "before_content_render" |
    "after_content_render" |
    "before_layout_render" |
    "after_layout_render"

type filterFunc = (pageContext: pageContext) => Promise<pageContext>

export { filter, filterFunc }
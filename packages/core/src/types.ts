import type { context } from '@maxwell-blog/context'
import type { RendererList } from '@maxwell-blog/renderer'

interface maxwellCore {
    context:context,
    rendererList:RendererList,
    plugins: any,
}

export {maxwellCore}

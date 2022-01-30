import type { context } from '@maxwellx/context'
import type { RendererList } from '@maxwellx/renderer'

interface maxwellCore {
    context:context,
    rendererList:RendererList,
    plugins: any,
}

export {maxwellCore}

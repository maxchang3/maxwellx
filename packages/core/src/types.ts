import type { context } from '@maxwellx/context'
import type{ Renderer, withContent, withReading } from "@maxwellx/api";


interface maxwellCore {
    context:context,
    renderer?: {
        template: Renderer<withReading>,
        markdown: Renderer<withContent>
    },
    plugins: any,
}

export {maxwellCore}

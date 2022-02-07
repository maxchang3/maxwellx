import type { context } from "@maxwellx/context"
import type { frontMatter } from "@maxwellx/layout"

type generatorFunc = (filesContext: context) => Promise<generatorConfig>
interface generatorConfig {
    frontmatter?: frontMatter,
    filename: string,
    content?: string,
    layout?: string,
    data?: any,
}

export { generatorConfig, generatorFunc }
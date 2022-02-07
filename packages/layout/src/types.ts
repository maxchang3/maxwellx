interface frontMatter {
    [key: string]: any
}
interface layoutFiles {
    [key: string]: string[]
}
interface layoutContext {
    frontMatter: frontMatter
    content: string,
    filename: string
}
interface filesContext {
    [layout: string]: {
        [filename: string]: layoutContext
    }
}

export { frontMatter, layoutContext, layoutFiles , filesContext }
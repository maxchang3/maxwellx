interface frontMatter {
    [key: string]: any
}
interface layoutFiles {
    [key: string]: string[]
}
interface pageContext {
    frontMatter: frontMatter
    content: string,
    filename: string
}
interface filesContext {
    [layout: string]: {
        [filename: string]: pageContext
    }
}

export { frontMatter, pageContext, layoutFiles , filesContext }
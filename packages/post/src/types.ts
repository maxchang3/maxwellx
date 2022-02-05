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

export { frontMatter, layoutContext , layoutFiles }
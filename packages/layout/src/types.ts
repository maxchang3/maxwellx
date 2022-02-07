interface frontMatter {
    [key: string]: any
}
interface layoutFiles {
    [key: string]: string[]
}
interface pageContext {
    frontMatter: frontMatter
    content: string,
    filename: string,
    data?: any
}
type filesContext = pageContext[]

export { frontMatter, pageContext, layoutFiles , filesContext }
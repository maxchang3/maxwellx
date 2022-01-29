interface readFileOptions {
    encoding?: BufferEncoding,
    escape?: boolean
}
interface frontMatter {
    [key: string]: any
}
interface postContext {
    frontMatter: frontMatter
    content: string
}
export { readFileOptions, postContext, frontMatter }
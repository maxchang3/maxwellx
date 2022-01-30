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
interface configure{
    /** site information */
    site: {
        /** site title */
        title: string,
        /** the author's name will show in the post */
        author: string,
    },
    /** site url configure */
    url: {
        /** site url such as https://example.com */
        url: string,
        /** site root path, if your site in a subdirectory such as `/blog/` just set it to `blog`   */
        root: string,
        /** site url route link for more information: https://todo.co/ */
        permalink: string
    },
    /** site directory */
    directory:{
        /** source file (mostly markdown) directroty */
        source: string,
        /** public dir to generate to */
        public: string,
        /** template dir */
        template: string
    },
    /** template name */
    template: string,
    /** plugins */
    plugins: string[]
}
export { readFileOptions, postContext, frontMatter,configure }
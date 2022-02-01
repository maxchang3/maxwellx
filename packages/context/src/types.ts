interface frontMatter {
    [key: string]: any
}
interface postContext {
    frontMatter: frontMatter
    content: string
}
interface readFileOptions {
    encoding?: BufferEncoding,
    escape?: boolean
}
interface configure {
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
    directory: {
        /** source file (mostly markdown) directroty */
        source: string,
        /** public dir to generate to */
        public: string,
        /** template dir */
        template: string
    },
    /** engine to render your source file */
    renderer: {
        /** template renderer */
        template: string,
        /** markdown renderer */
        markdown: string
    },
    /** template name */
    template: string,
    /** plugins */
    plugins: string[]
}
interface context {
    config: configure,
    postContext?: postContext
}


export { readFileOptions, configure, context ,postContext,frontMatter}
